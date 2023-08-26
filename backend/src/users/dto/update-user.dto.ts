import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    name?: string;

    @IsEmail()
    @IsOptional()
    @IsNotEmpty()
    email?: string;

    @IsNotEmpty()
    @IsOptional()
    @IsString()
    password?: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    address?: string;

    @IsNumber()
    @IsOptional()
    @IsNotEmpty()
    phone?: number;

    @IsOptional()
    userPets?: UserPet[];
}

class UserPet {
    @IsNotEmpty()
    _id: string;
}
