import { Body, Controller, Delete, Get, Param, ParseIntPipe, Put, Req, UseGuards } from '@nestjs/common';
import { UserType } from 'src/enums/user-type.enum';
import { PatientAppointmentDto } from 'src/models/appointment.model';
import { TherapistDto } from 'src/models/therapist.model';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { Roles } from '../auth/roles.decorator';
import { RoleGuard } from '../auth/roles.guard';
import { PatientService } from './patient.service';

@Controller('patient')
export class PatientController {
    constructor(private readonly patientService: PatientService) { }
    
    @UseGuards(AuthenticatedGuard)
    @UseGuards(RoleGuard)
    @Roles(UserType.Patient)
    @Get("get-therapist-list")
    async getTherapistList(): Promise<TherapistDto[]>{
        return await this.patientService.getTherapistList();
    }

    @UseGuards(AuthenticatedGuard)
    @UseGuards(RoleGuard)
    @Roles(UserType.Patient)
    @Put("choose-therapist")
    async chooseTherapist(@Req() request, @Body() body: {therapistId: number}) : Promise<number>{
        let finished: boolean = await this.patientService.chooseTherapist(request.user.id, body.therapistId);
        if(finished)
            return body.therapistId;
    }

    @UseGuards(AuthenticatedGuard)
    @UseGuards(RoleGuard)
    @Roles(UserType.Patient)
    @Get("get-therapist-schedule")
    async getTherapistSchedule(@Req() request) : Promise<PatientAppointmentDto[]>{
        return await this.patientService.getTherapistSchedule(request.user.id);
    }

    @UseGuards(AuthenticatedGuard)
    @UseGuards(RoleGuard)
    @Roles(UserType.Patient)
    @Put("make-an-appointment")
    async makeAnAppointment(@Req() request, @Body() body: {date: string, appointmentNumber: number}) : Promise<PatientAppointmentDto>{
        return await this.patientService.makeAnAppointment(request.user.id, body.date, body.appointmentNumber);
    }

    @UseGuards(AuthenticatedGuard)
    @UseGuards(RoleGuard)
    @Roles(UserType.Patient)
    @Delete("cancel-an-appointment/:appointmentId")
    async cancelAnAppointment(@Req() request, @Param('appointmentId', ParseIntPipe) appointmentId: number ) : Promise<any>{
        return await this.patientService.cancelAnAppointment(request.user.id, appointmentId);
    }
}
