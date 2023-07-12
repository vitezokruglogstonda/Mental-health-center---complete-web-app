import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from 'src/entities/schedule.entity';
import { User } from 'src/entities/user.entity';
import { UserType } from 'src/enums/user-type.enum';
import { environment } from 'src/environments/environment';
import { PatientAppointmentDto } from 'src/models/appointment.model';
import { TherapistDto } from 'src/models/therapist.model';
import { Repository } from 'typeorm';

@Injectable()
export class PatientService {
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(Schedule) private scheduleRepo: Repository<Schedule>
    ) { }

    async getTherapistList(): Promise<TherapistDto[]> {
        let return_list: TherapistDto[] = [];
        let therapistList: User[] = await this.userRepo.createQueryBuilder("user")
            .leftJoinAndSelect("user.description", "description")
            .where("user.userType = :type", { type: UserType.Therapist })
            .getMany();
        therapistList.forEach(therapist => {
            let therapistDto: TherapistDto = {
                id: therapist.id,
                email: therapist.email,
                firstName: therapist.firstName,
                lastName: therapist.lastName,
                gender: therapist.gender,
                phoneNumber: therapist.phoneNumber,
                profilePicturePath: environment.server_own_url + environment.user_path_to_profile_picture + therapist.profilePicturePath,
                description: therapist.description.descriptionText
            };
            return_list.push(therapistDto);
        })
        return return_list;
    }

    async chooseTherapist(patientId: number, therapistId: number): Promise<boolean> {
        let patient: User = await this.userRepo.createQueryBuilder("user")
            .where("user.id = :id", { id: patientId })
            .getOne();
        let therapist: User = await this.userRepo.createQueryBuilder("user")
            .where("user.id = :id", { id: therapistId })
            .getOne();
        patient.therapist = therapist;
        await this.userRepo.save(patient);
        return true;
    }

    async getTherapistSchedule(patientId: number): Promise<PatientAppointmentDto[]> {
        let return_list: PatientAppointmentDto[] = [];

        let patient: User = await this.userRepo.createQueryBuilder("user")
            .leftJoinAndSelect("user.therapist", "therapist")
            .where("user.id = :id", { id: patientId })
            .getOne();

        let allAppointments: Schedule[] = await this.scheduleRepo.createQueryBuilder("schedule")
            .leftJoinAndSelect("schedule.therapist", "therapist")
            .leftJoinAndSelect("schedule.patient", "patient")
            .where("schedule.therapistId = :id", { id: patient.therapist.id })
            .getMany();


        let todayDate: Date = new Date();
        let filteredAppointments: Schedule[] = allAppointments.filter(appointment => {
            let stringDate: String[] = appointment.date.split('.', 3);
            if (todayDate.getFullYear() <= Number(stringDate[2])) {
                if (todayDate.getMonth() + 1 <= Number(stringDate[1])) {
                    if (todayDate.getDate() <= Number(stringDate[0])) {
                        return true;
                    }
                }
            }
            return false;
        })

        filteredAppointments.forEach(appointment => {
            let patientAppointmentDto: PatientAppointmentDto = {
                id: appointment.id,
                date: appointment.date,
                appointmentNumber: appointment.appointmentNumber,
                usersAppointment: appointment.patient.id === patientId ? true : false
            }
            return_list.push(patientAppointmentDto);
        })

        return return_list;
    }

    async makeAnAppointment(patientId: number, date: string, appointmentNumber: number): Promise<PatientAppointmentDto> {
        let patient: User = await this.userRepo.createQueryBuilder("user")
            .leftJoinAndSelect("user.therapist", "therapist")
            .where("user.id = :id", {id: patientId})
            .getOne();

        const newAppointment: Schedule = this.scheduleRepo.create({
            date: date,
            appointmentNumber: appointmentNumber,
            patient: patient,
            therapist: patient.therapist,
        });
        await this.scheduleRepo.save(newAppointment);

        let newAppointmentDto: PatientAppointmentDto = {
            id: newAppointment.id,
            date: newAppointment.date,
            appointmentNumber: newAppointment.appointmentNumber,
            usersAppointment: true
        }

        return newAppointmentDto;
    }

    async cancelAnAppointment(patientId: number, appointmentId: number): Promise<boolean> {
        let appointment: Schedule = await this.scheduleRepo.createQueryBuilder("schedule")
            .leftJoinAndSelect("schedule.patient", "patient")
            .where("schedule.id = :id", {id: appointmentId})
            .getOne();
        if(!appointment && appointment.patient.id !== patientId){
            return false;
        }else{
            await this.scheduleRepo.delete(appointmentId);
            return true;
        }
    }

}
