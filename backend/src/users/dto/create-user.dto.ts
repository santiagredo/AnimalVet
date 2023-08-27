import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Min,
    MinLength,
} from 'class-validator';

export class CreateUserDto {
    @Min(10000)
    @IsNumber()
    @IsNotEmpty()
    governmentID: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    password: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsNumber()
    @IsNotEmpty()
    phone: number;

    @IsOptional()
    userPets?: UserPet[];

    @IsOptional()
    userAppointments?: UserAppointments[];
}

class UserPet {
    @IsNotEmpty()
    _id: string;
}

class UserAppointments {
    @IsNotEmpty()
    _id: string;
}
