import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
    timestamps: true,
    collection: 'Appointments',
})
export class Appointment {
    @Prop({ trim: true })
    serviceName: string;

    @Prop({ trim: true })
    appointmentDate: Date;

    @Prop({ trim: true })
    governmentID: number;

    @Prop({ trim: true })
    name: string;

    @Prop({ trim: true })
    email: string;

    @Prop({ trim: true })
    phone: number;

    @Prop({ trim: true })
    petName: string;

    @Prop({ trim: true })
    petSpecie: string;

    @Prop({ trim: true })
    petRace: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
