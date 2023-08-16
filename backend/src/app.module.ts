import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { PetsModule } from './pets/pets.module';
import { AppointmentsModule } from './appointments/appointments.module';

const uri ='mongodb://127.0.0.1:27017';
const db = "AnimalVet";

@Module({
    imports: [MongooseModule.forRoot(uri, {dbName: db}), UsersModule, PetsModule, AppointmentsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
