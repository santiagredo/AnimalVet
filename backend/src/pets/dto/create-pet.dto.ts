import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePetDto {
    @IsNumber()
    @IsNotEmpty()
    OwnerGovernmentID: number;

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