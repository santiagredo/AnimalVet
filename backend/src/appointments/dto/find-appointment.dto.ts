import { IsEmail, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class FindAppointmentDto {
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
}
