import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    InternalServerErrorException,
    BadRequestException,
    NotFoundException,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Types } from 'mongoose';

@Controller('appointments')
export class AppointmentsController {
    constructor(private readonly appointmentsService: AppointmentsService) {}

    @Post()
    async create(@Body() createAppointmentDto: CreateAppointmentDto) {
        try {
            return this.appointmentsService.createAppointment(
                createAppointmentDto,
            );
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    @Get()
    async findAll() {
        try {
            return this.appointmentsService.findAllAppointments();
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    @Get(':id')
    async findOneAppointment(@Param('id') id: string) {
        try {
            return this.appointmentsService.findOneAppointment(id);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateAppointmentDto: UpdateAppointmentDto,
    ) {
        try {
            return this.appointmentsService.updateAppointment(
                new Types.ObjectId(id),
                updateAppointmentDto,
            );
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid appointment ID');
        }

        const appointment = await this.appointmentsService.deleteAppointment(
            new Types.ObjectId(id),
        );

        if (!appointment.governmentID) {
            throw new NotFoundException('Appointment not found');
        }

        return true;
    }
}
