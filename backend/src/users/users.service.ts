import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from "@nestjs/mongoose";

import { User } from 'src/schemas/User.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async createUser(createUserDto: CreateUserDto) {
        const newUser = new this.userModel(createUserDto);
        return await newUser.save();
    }

    async findAllUsers() {
        return await this.userModel.find({});
    }

    async findUser(id: number) {
        return await this.userModel.findOne({ governmentID: id});
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto) {
        return await this.userModel.findOneAndUpdate({ governmentID: id }, updateUserDto , { new: true });
    }

    async deleteUser(id: number) {
        return await this.userModel.deleteOne({ governmentID: id });
    }

    async addUserPets(id: number, petObjectId: string) {
        return await this.userModel.findOneAndUpdate({ governmentID: id }, { $push: { userPets: petObjectId }}, { new: true });
    }

    async deleteUserPets(governmentID: number, _id: string) {
        return await this.userModel.findOneAndUpdate({ governmentID: governmentID }, { $pull: { userPets: _id }}, { new: true });
    }
}
