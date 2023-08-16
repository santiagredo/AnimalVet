import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: true,
    collection: "Users"
})
export class User {
    @Prop({
        trim: true,
        unique: true
    })
    governmentID: number;

    @Prop({ trim: true })
    name: string;

    @Prop({ trim: true })
    email: string;

    @Prop({ trim: true })
    address: string;

    @Prop({ trim: true })
    phone: number;

    @Prop()
    userPets?: UserPet[];
}

export class UserPet {
    _id: string
}

export const UserSchema = SchemaFactory.createForClass(User);
