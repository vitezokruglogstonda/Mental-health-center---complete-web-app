import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from 'src/entities/note.entity';
import { Schedule } from 'src/entities/schedule.entity';
import { User } from 'src/entities/user.entity';
import { environment } from 'src/environments/environment';
import { TherapistAppointmentDto } from 'src/models/appointment.model';
import { PatientDto } from 'src/models/patient.model';
import { Repository } from 'typeorm';

@Injectable()
export class TherapistService {
    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
        @InjectRepository(Schedule) private scheduleRepo: Repository<Schedule>,
        @InjectRepository(Note) private noteRepo: Repository<Note>
    ) { }

    async getPatientList(id: number): Promise<PatientDto[]> {
        let return_list: PatientDto[] = [];

        let patients: User[] = await this.userRepo.createQueryBuilder("user")
            .leftJoinAndSelect("user.birthDate", "birthDate")
            .leftJoinAndSelect("user.note", "note")
            .leftJoin("user.therapist", "therapist")
            .where("user.therapist.id = :therapistId", { therapistId: id })
            .getMany();

        patients.forEach(patient => {
            let patientDto: PatientDto = {
                id: patient.id,
                email: patient.email,
                firstName: patient.firstName,
                lastName: patient.lastName,
                birthDate: {
                    year: patient.birthDate.year,
                    month: patient.birthDate.month,
                    day: patient.birthDate.day,
                },
                gender: patient.gender,
                phoneNumber: patient.phoneNumber,
                profilePicturePath: environment.server_own_url + environment.user_path_to_profile_picture + patient.profilePicturePath,
                note: patient.note ?  patient.note.noteText : ""
            }
            return_list.push(patientDto);
        })

        return return_list;
    }

    async getSchedule(id: number): Promise<TherapistAppointmentDto[]> {
        let return_list: TherapistAppointmentDto[] = [];

        let schedule: Schedule[] = await this.scheduleRepo.createQueryBuilder("schedule")
            .leftJoinAndSelect("schedule.patient", "patient")
            .leftJoinAndSelect("schedule.therapist", "therapist")
            .where("schedule.therapist.id = :therapistId", { therapistId: id })
            .getMany();

        schedule.forEach(appointment => {
            let appointmentDto: TherapistAppointmentDto = {
                id: appointment.id,
                therapistID: appointment.therapist.id,
                date: appointment.date,
                appointmentNumber: appointment.appointmentNumber,
                patientId: appointment.patient.id
            }
            return_list.push(appointmentDto);
        });

        return return_list;
    }

    async updatePatientNote(patientId: number, note: string): Promise<PatientDto> {
        let noteObj: Note;
        noteObj = await this.noteRepo.createQueryBuilder("note")
            .leftJoinAndSelect("note.patient", "patient")
            .where("note.patient.id = :patientId", { patientId: patientId })
            .getOne();

        if(noteObj){
            noteObj.noteText = note;
        }else{
            let patient: User = await this.userRepo.createQueryBuilder("user")
                .where("user.id = :id", {id: patientId})
                .getOne();
            noteObj = await this.noteRepo.create({
                noteText: note,
                patient: patient
            })
        }
        
        await this.noteRepo.save(noteObj);

        let patient: User = await this.userRepo.createQueryBuilder("user")
            .leftJoinAndSelect("user.birthDate", "birthDate")
            .where("user.id = :patientId", { patientId: patientId })
            .getOne();

        let patientDto: PatientDto = {
            id: patient.id,
            email: patient.email,
            firstName: patient.firstName,
            lastName: patient.lastName,
            birthDate: {
                year: patient.birthDate.year,
                month: patient.birthDate.month,
                day: patient.birthDate.day,
            },
            gender: patient.gender,
            phoneNumber: patient.phoneNumber,
            profilePicturePath: environment.server_own_url + environment.user_path_to_profile_picture + patient.profilePicturePath,
            note: noteObj.noteText
        }
        return patientDto;
    }

}
