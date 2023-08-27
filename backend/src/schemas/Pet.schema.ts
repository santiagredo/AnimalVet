import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: true,
    collection: 'Pets',
})
export class Pet {
    @Prop({
        trim: true,
    })
    OwnerGovernmentID: number;

    @Prop({ trim: true })
    petName: string;

    @Prop({ trim: true })
    petSpecie: string;

    @Prop({ trim: true })
    petRace: string;
}

export const PetSchema = SchemaFactory.createForClass(Pet);
