import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    NotFoundException,
    BadRequestException,
    HttpCode,
    UseGuards,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Types } from 'mongoose';
import { JwtAuthGuard } from 'src/users/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('pets')
export class PetsController {
    constructor(private readonly petsService: PetsService) {}

    @Post()
    async createPet(@Body() createPetDto: CreatePetDto) {
        return this.petsService.createPet(createPetDto);
    }

    @Get()
    async findAllPets() {
        return this.petsService.findAllPets();
    }

    @Get(':id')
    async findPet(@Param('id') id: string) {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid pet ID');
        }

        const pet = await this.petsService.findPet(new Types.ObjectId(id));

        if (!pet) {
            throw new NotFoundException('Pet not found');
        }

        return pet;
    }

    @Patch(':id')
    @HttpCode(202)
    async updatePet(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid pet ID');
        }

        const pet = await this.petsService.updatePet(
            new Types.ObjectId(id),
            updatePetDto,
        );

        if (!pet) {
            throw new NotFoundException('Pet not found');
        }

        return true;
    }

    @Delete(':id')
    async deletePet(@Param('id') id: string) {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid pet ID');
        }

        const pet = await this.petsService.deletePet(new Types.ObjectId(id));

        if (!pet.OwnerGovernmentID) {
            throw new NotFoundException('Pet not found');
        }

        return true;
    }
}
