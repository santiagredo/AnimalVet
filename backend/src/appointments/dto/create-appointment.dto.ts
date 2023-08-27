import { IsEmail, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateAppointmentDto {
    @IsString()
    @IsNotEmpty()
    serviceName: string;

    @IsString()
    @IsNotEmpty()
    appointmentDate: Date;

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

    @IsNumber()
    @IsNotEmpty()
    phone: number;

    @IsString()
    @IsNotEmpty()
    petName: string;

    @IsString()
    @IsNotEmpty()
    petSpecie: string;

    @IsString()
    @IsNotEmpty()
    petRace: string;
}
