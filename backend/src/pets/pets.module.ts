import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pet, PetSchema } from 'src/schemas/Pet.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Pet.name,
                schema: PetSchema,
            },
        ]),
        UsersModule,
    ],
    controllers: [PetsController],
    providers: [PetsService],
})
export class PetsModule {}
