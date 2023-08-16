import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdatePetDto {
    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    OwnerGovernmentID?: number;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    petName?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    petRace?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    petSpecie?: string;
}