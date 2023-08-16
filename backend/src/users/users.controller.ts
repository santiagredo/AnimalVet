import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ConflictException,
    NotFoundException,
    HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        try {
            return await this.usersService.createUser(createUserDto);
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException(
                    'Government ID already associated to an existing account',
                );
            }

            throw error;
        }
    }

    @Get()
    async findAllUsers() {
        return await this.usersService.findAllUsers();
    }

    @Get(':id')
    async findUser(@Param('id') id: string) {
        const user = await this.usersService.findUser(Number(id));

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }

    @Patch(':id')
    @HttpCode(202)
    async updateUser(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        const user = await this.usersService.updateUser(
            Number(id),
            updateUserDto,
        );

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return true;
    }

    @Delete(':id')
    @HttpCode(202)
    async deleteUser(@Param('id') id: string) {
        const user = await this.usersService.deleteUser(Number(id));

        if (!user.deletedCount) {
            throw new NotFoundException('User not found');
        }

        return true;
    }
}
