import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";

export class CreateUserDto {
    @IsNumber()
    @IsNotEmpty()
    governmentID: number

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsNumber()
    @IsNotEmpty()
    phone: number;

    @IsOptional()
    userPets?: UserPet[];
}

class UserPet {
    @IsNotEmpty()
    _id: Types.ObjectId
}