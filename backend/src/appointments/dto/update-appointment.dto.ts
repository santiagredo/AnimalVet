import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Min,
} from 'class-validator';

export class UpdateAppointmentDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    serviceName?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    appointmentDate?: Date;

    @Min(10000)
    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    governmentID?: number;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name?: string;

    @IsEmail()
    @IsNotEmpty()
    @IsOptional()
    email?: string;

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    phone?: number;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    petName?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    petSpecie?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    petRace?: string;
}
