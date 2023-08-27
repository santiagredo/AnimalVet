import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pet } from './entities/pet.entity';
import { Model, Types } from 'mongoose';
import { UsersService } from 'src/users/users.service';

interface DeletePetDto {
    OwnerGovernmentID: number;
    petName: string;
    petSpecie: string;
    petRace: string;
    createdAt: AtedAt;
    updatedAt: AtedAt;
    __v: number;
}

interface AtedAt {
    $date: Date;
}

@Injectable()
export class PetsService {
    constructor(
        @InjectModel(Pet.name) private petModel: Model<Pet>,
        private usersService: UsersService,
    ) {}

    async createPet(createPetDto: CreatePetDto) {
        const newPet = await new this.petModel(createPetDto).save();

        await this.usersService.addUserPets(
            createPetDto.OwnerGovernmentID,
            String(newPet._id),
        );
        return newPet;
    }

    async findAllPets() {
        return await this.petModel.find({});
    }

    async findPet(_id: Types.ObjectId) {
        return await this.petModel.findOne({ _id });
    }

    async updatePet(_id: Types.ObjectId, updatePetDto: UpdatePetDto) {
        return await this.petModel.findOneAndUpdate({ _id }, updatePetDto, {
            new: true,
        });
    }

    async deletePet(_id: Types.ObjectId) {
        const deletedPet: DeletePetDto = await this.petModel.findOneAndDelete({
            _id,
        });

        if (!deletedPet) throw new NotFoundException('Pet not found');

        await this.usersService.deleteUserPets(
            deletedPet.OwnerGovernmentID,
            String(_id),
        );

        return deletedPet;
    }
}
