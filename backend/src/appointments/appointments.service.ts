import {
    Injectable,
    BadRequestException,
    NotFoundException,
} from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Appointment } from 'src/schemas/Appointment.schema';
import { Model, Types } from 'mongoose';
import { ObjectId } from 'mongodb';
import { FindAppointmentDto } from './dto/find-appointment.dto';
import { UsersService } from 'src/users/users.service';

const Holidays = require('date-holidays');

@Injectable()
export class AppointmentsService {
    constructor(
        @InjectModel(Appointment.name)
        private appointmentModel: Model<Appointment>,
        private usersService: UsersService,
    ) {}

    async createAppointment(createAppointmentDto: CreateAppointmentDto) {
        const appointmentDate = createAppointmentDto.appointmentDate;
        const serviceName = createAppointmentDto.serviceName;

        const isValidService = await this.isValidService(
            appointmentDate,
            serviceName,
        );
        if (!isValidService) throw new BadRequestException('Invalid service');

        const isAvailble = await this.isAvailable({
            appointmentDate: createAppointmentDto.appointmentDate,
            governmentID: createAppointmentDto.governmentID,
            serviceName: createAppointmentDto.serviceName,
        });
        if (!isAvailble) throw new BadRequestException('Already booked');

        const user = await this.usersService.findUser(
            createAppointmentDto.governmentID,
        );

        if (user) {
            const newAppointment = new this.appointmentModel(
                createAppointmentDto,
            );

            const appointmentResults = await newAppointment.save();

            await this.usersService.addUserAppointments(
                user.governmentID,
                String(appointmentResults._id),
            );

            return appointmentResults;
        }
    }

    private isValidService(appointmentDate: Date, serviceName: string) {
        for (const key in services) {
            const service = services[key];

            if (service.serviceName === serviceName) {
                if (!this.isValidDate(appointmentDate, serviceName)) {
                    throw new BadRequestException('Invalid date');
                }
                if (!this.isValidHour(appointmentDate, service)) {
                    throw new BadRequestException('Invalid hour');
                }
                return true;
            }
        }
        return false;
    }

    private isValidDate(appointmentDate: Date, serviceName: string) {
        const isSaturday = new Date(appointmentDate).getDay() === 6;
        const hd = new Holidays('CO');

        if (hd.isHoliday(appointmentDate))
            throw new BadRequestException('Invalid date: Not open on holidays');
        if (new Date(appointmentDate).getDay() === 0)
            throw new BadRequestException('Invalid date: Not open on Sundays');
        if (new Date() > new Date(appointmentDate))
            throw new BadRequestException('Invalid date: Date in the past');
        if (
            (serviceName === services.CatGrooming.serviceName && isSaturday) ||
            (serviceName === services.Control.serviceName && isSaturday)
        )
            throw new BadRequestException(
                'Invalid date: No cat grooming or controls on Saturdays',
            );

        return true;
    }

    private isValidHour(appointmentDate: Date, service: Service) {
        const date = new Date(appointmentDate);

        const serviceStartsAt = new Date(
            `${date.getFullYear()}-${
                date.getMonth() + 1
            }-${date.getDate()} ${service.startsAt.getHours()}:${service.startsAt.getMinutes()}:${service.startsAt.getMilliseconds()}`,
        );
        const serviceEndsAt = new Date(
            `${date.getFullYear()}-${
                date.getMonth() + 1
            }-${date.getDate()} ${service.endsAt.getHours()}:${service.endsAt.getMinutes()}:${service.endsAt.getMilliseconds()}`,
        );

        const serviceLunchStartsAt = new Date(
            `${date.getFullYear()}-${
                date.getMonth() + 1
            }-${date.getDate()} 14:00:00`,
        );
        const serviceLunchEndsAt = new Date(
            `${date.getFullYear()}-${
                date.getMonth() + 1
            }-${date.getDate()} 15:00:00`,
        );

        // The time in miliseconds needed to make an appointment before lunch or closing time
        const preLunchOrClosingTimeOffset = service.serviceDuration * 60 * 1000;

        if (date.getTime() < serviceStartsAt.getTime())
            throw new BadRequestException(
                'Invalid hour: Appointment set before open hours',
            );
        if (
            date.getTime() >
            serviceEndsAt.getTime() - preLunchOrClosingTimeOffset
        )
            throw new BadRequestException(
                'Invalid hour: Appointment set after open hours',
            );

        if (
            service.lunchConstraint &&
            date.getTime() >
                serviceLunchStartsAt.getTime() - preLunchOrClosingTimeOffset &&
            date.getTime() < serviceLunchEndsAt.getTime()
        )
            throw new BadRequestException(
                'Invalid hour: Appointment set on lunch hours',
            );

        const formattedTime = date.toLocaleTimeString('en-CO', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });

        switch (service.serviceName) {
            case services.AnimalGrooming.serviceName:
                const availableHours = [
                    '09:00',
                    '10:30',
                    '12:00',
                    '13:30',
                    '15:00',
                ];

                if (!availableHours.includes(formattedTime))
                    throw new BadRequestException(
                        `Invalid hour: Big animal grooming only available at 09:00, 10:30, 12:00, 13:30, 15:00`,
                    );
                break;
            case services.CatGrooming.serviceName:
                // console.log('Cat grooming: no validations');
                break;
            case services.Consult.serviceName:
                const consultFilter = /:00$|:30$/;

                if (!consultFilter.test(formattedTime))
                    throw new BadRequestException(
                        "Invalid hour: Consult only valid on o'clock and half hours",
                    );
                break;
            case services.TestLabs.serviceName:
                const testLabsFilter = /:00$|:15$|:30$|:45$/;

                if (!testLabsFilter.test(formattedTime))
                    throw new BadRequestException(
                        'Invalid hour: Test labs only valid on :00, :15, :30, :45 hours',
                    );
                break;
            case services.Speciality.serviceName:
                // console.log('Speciality: no validations');
                break;
            case services.MedicalAppointment.serviceName:
                const medicalAppointmentFilter = /:00$|:30$/;

                if (!medicalAppointmentFilter.test(formattedTime))
                    throw new BadRequestException(
                        "Invalid hour: Medical appointments only valid on o'clock and half hours",
                    );
                break;
            case services.Control.serviceName:
                const controlFilter = /:00$|:30$/;

                if (!controlFilter.test(formattedTime))
                    throw new BadRequestException(
                        "Invalid hour: Control appointments only valid on o'clock and half hours",
                    );
                break;
            default:
                break;
        }

        return true;
    }

    private async isAvailable(findAppointmentDto: FindAppointmentDto) {
        const date = new Date(findAppointmentDto.appointmentDate);

        const appointments = await this.appointmentModel.find({
            appointmentDate: date,
            serviceName: findAppointmentDto.serviceName,
            governmentID: findAppointmentDto.governmentID,
        });

        if (appointments.length > 0)
            throw new BadRequestException(
                'Not available: Appointment hour already scheduled',
            );

        return true;
    }

    async findOneAppointment(id: string) {
        if (!ObjectId.isValid(id))
            throw new BadRequestException('Invalid Object ID');
        return await this.appointmentModel.findById(new Types.ObjectId(id));
    }

    async findAllAppointments() {
        return await this.appointmentModel.find({});
    }

    async updateAppointment(
        _id: Types.ObjectId,
        updateAppointmentDto: UpdateAppointmentDto,
    ) {
        return await this.appointmentModel.findOneAndUpdate(
            { _id },
            updateAppointmentDto,
            { new: true },
        );
    }

    async deleteAppointment(_id: Types.ObjectId) {
        const deletedAppointment: CreateAppointmentDto =
            await this.appointmentModel.findOneAndDelete({
                _id,
            });

        if (!deletedAppointment)
            throw new NotFoundException('Appointment not found');

        await this.usersService.deleteUserAppointments(
            deletedAppointment.governmentID,
            String(_id),
        );

        return deletedAppointment;
    }
}

interface Service {
    serviceName: string;
    serviceDuration: number;
    lunchConstraint: boolean;
    startsAt: Date;
    endsAt: Date;
}

interface Services {
    AnimalGrooming: Service;
    CatGrooming: Service;
    Consult: Service;
    TestLabs: Service;
    Speciality: Service;
    MedicalAppointment: Service;
    Control: Service;
}

const services: Services = {
    AnimalGrooming: {
        serviceName: 'Animal grooming',
        serviceDuration: 90,
        lunchConstraint: false,
        startsAt: new Date('2023-01-01 09:00 GMT-05:00'),
        endsAt: new Date('2023-01-01 16:30 GMT-05:00'),
    },
    CatGrooming: {
        serviceName: 'Cat grooming',
        serviceDuration: 0,
        lunchConstraint: false,
        startsAt: new Date('2023-01-01 09:00 GMT-05:00'),
        endsAt: new Date('2023-01-01 17:00 GMT-05:00'),
    },
    Consult: {
        serviceName: 'Consult',
        serviceDuration: 30,
        lunchConstraint: true,
        startsAt: new Date('2023-01-01 10:30 GMT-05:00'),
        endsAt: new Date('2023-01-01 17:00 GMT-05:00'),
    },
    TestLabs: {
        serviceName: 'Test labs',
        serviceDuration: 15,
        lunchConstraint: true,
        startsAt: new Date('2023-01-01 09:00 GMT-05:00'),
        endsAt: new Date('2023-01-01 10:30 GMT-05:00'),
    },
    Speciality: {
        serviceName: 'Speciality',
        serviceDuration: 0,
        lunchConstraint: true,
        startsAt: new Date('2023-01-01 09:00 GMT-05:00'),
        endsAt: new Date('2023-01-01 17:00 GMT-05:00'),
    },
    MedicalAppointment: {
        serviceName: 'Medical appointment',
        serviceDuration: 30,
        lunchConstraint: true,
        startsAt: new Date('2023-01-01 09:00 GMT-05:00'),
        endsAt: new Date('2023-01-01 17:00 GMT-05:00'),
    },
    Control: {
        serviceName: 'Control',
        serviceDuration: 30,
        lunchConstraint: true,
        startsAt: new Date('2023-01-01 10:30 GMT-05:00'),
        endsAt: new Date('2023-01-01 17:00 GMT-05:00'),
    },
};
