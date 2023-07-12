import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { UserType } from 'src/enums/user-type.enum';
import { TherapistAppointmentDto } from 'src/models/appointment.model';
import { PatientDto } from 'src/models/patient.model';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { Roles } from '../auth/roles.decorator';
import { RoleGuard } from '../auth/roles.guard';
import { TherapistService } from './therapist.service';

@Controller('therapist')
export class TherapistController {
    constructor(private readonly therapistService: TherapistService) { }

    @UseGuards(AuthenticatedGuard)
    @UseGuards(RoleGuard)
    @Roles(UserType.Therapist)
    @Get("get-patient-list")
    async getPatientList(@Req() request): Promise<PatientDto[]>{
        return await this.therapistService.getPatientList(request.user.id as number);
    }

    @UseGuards(AuthenticatedGuard)
    @UseGuards(RoleGuard)
    @Roles(UserType.Therapist)
    @Get("get-schedule")
    async getSchedule(@Req() request): Promise<TherapistAppointmentDto[]>{
        return await this.therapistService.getSchedule(request.user.id as number);
    }

    @UseGuards(AuthenticatedGuard)
    @UseGuards(RoleGuard)
    @Roles(UserType.Therapist)
    @Put("update-note")
    async updateNote(@Body() data: {patientId: number, note: string}): Promise<PatientDto>{
        return await this.therapistService.updatePatientNote(data.patientId, data.note);
    }


}
