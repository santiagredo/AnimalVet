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
    UseGuards,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Types } from 'mongoose';
import { JwtAuthGuard } from 'src/users/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('appointments')
export class AppointmentsController {
    constructor(private readonly appointmentsService: AppointmentsService) {}

    @Post()
    async createAppointment(@Body() createAppointmentDto: CreateAppointmentDto) {
        try {
            return this.appointmentsService.createAppointment(
                createAppointmentDto,
            );
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    @Get()
    async findAllAppointments() {
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
    async updateAppointment(
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
    async deleteAppointment(@Param('id') id: string) {
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
