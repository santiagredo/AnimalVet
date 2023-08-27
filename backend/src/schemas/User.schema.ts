import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: true,
    collection: 'Users',
})
export class User {
    @Prop({
        trim: true,
        unique: true,
    })
    governmentID: number;

    @Prop({ trim: true })
    name: string;

    @Prop({
        trim: true,
        unique: true,
    })
    email: string;

    @Prop({ trim: true })
    password: string;

    @Prop({ trim: true })
    address: string;

    @Prop({ trim: true })
    phone: number;

    @Prop()
    userPets?: UserPet[];

    @Prop()
    userAppointments?: UserAppointments[];
}

export class UserPet {
    _id: string;
}

export class UserAppointments {
    _id: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
