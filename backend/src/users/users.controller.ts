import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    NotFoundException,
    HttpCode,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('create')
    async createUser(@Body() createUserDto: CreateUserDto) {
        return await this.usersService.createUser(createUserDto);
    }

    @Post('login')
    async loginUser(@Body() loginUserDto: LoginUserDto) {
        return await this.usersService.loginUser(loginUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAllUsers() {
        return await this.usersService.findAllUsers();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findUser(@Param('id') id: string) {
        return await this.usersService.findUser(Number(id));
    }

    @UseGuards(JwtAuthGuard)
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

    @UseGuards(JwtAuthGuard)
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
