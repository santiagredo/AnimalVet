import {
    ConflictException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult } from 'mongoose/node_modules/mongodb';
import { User } from 'src/schemas/User.schema';
import { Model } from 'mongoose';
import { hash, compare } from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtAuthService: JwtService,
        private configService: ConfigService,
    ) {}

    async createUser(createUserDto: CreateUserDto) {
        try {
            const { password } = createUserDto;

            const plainToHash = await hash(password, 10);

            createUserDto = { ...createUserDto, password: plainToHash };

            const newUser = new this.userModel(createUserDto);
            return await newUser.save();
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException(
                    'Government ID or email address already associated to an existing account',
                );
            }

            throw error;
        }
    }

    async loginUser(loginUserDto: LoginUserDto) {
        const { email, password } = loginUserDto;

        const user = await this.userModel.findOne({ email });
        console.log(user);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const checkPassword = await compare(password, user.password);

        if (!checkPassword) {
            throw new UnauthorizedException('Invalid password');
        }

        const payload = { _id: user._id, name: user.name };
        const token = this.jwtAuthService.sign(payload);

        const data = {
            user,
            token,
        };

        return data;
    }

    async findAllUsers() {
        return await this.userModel.find({});
    }

    async findUser(governmentID: number) {
        const user = await this.userModel.findOne({
            governmentID: governmentID,
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    async updateUser(governmentID: number, updateUserDto: UpdateUserDto) {
        return await this.userModel.findOneAndUpdate(
            { governmentID: governmentID },
            updateUserDto,
            { new: true },
        );
    }

    async deleteUser(governmentID: number): Promise<DeleteResult> {
        return await this.userModel.deleteOne({ governmentID: governmentID });
    }

    async addUserPets(governmentID: number, petObjectId: string) {
        return await this.userModel.findOneAndUpdate(
            { governmentID: governmentID },
            { $push: { userPets: petObjectId } },
            { new: true },
        );
    }

    async deleteUserPets(governmentID: number, petObjectId: string) {
        return await this.userModel.findOneAndUpdate(
            { governmentID: governmentID },
            { $pull: { userPets: petObjectId } },
            { new: true },
        );
    }

    async addUserAppointments(
        governmentID: number,
        appointmentObjectId: string,
    ) {
        return await this.userModel.findOneAndUpdate(
            { governmentID: governmentID },
            { $push: { userAppointments: appointmentObjectId } },
            { new: true },
        );
    }

    async deleteUserAppointments(
        governmentID: number,
        appointmentObjectId: string,
    ) {
        return await this.userModel.findOneAndUpdate(
            { governmentID: governmentID },
            { $pull: { userAppointments: appointmentObjectId } },
            { new: true },
        );
    }
}
