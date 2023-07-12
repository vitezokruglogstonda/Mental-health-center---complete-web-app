import { EntityState } from "@ngrx/entity";
import { CustomDate } from "./user";

export interface TherapistListItem{
    id: number|null;
    email: String;
    firstName: String;
    lastName: String;
    gender: String;
    phoneNumber: String;
    profilePicturePath: String;
    description: String | null;
}

export interface TherapistListState extends EntityState<TherapistListItem>{

}

// export interface TherapistDto{
//     therapistInfo: TherapistInfoDto | null;
//     //schedule: ScheduleDto[] | null;
//     schedule: ScheduleDtoState 
// }

export interface ScheduleDtoState extends EntityState<ScheduleDto>{

}

// export interface TherapistInfoDto{
//     id: number,
//     email: String,
//     firstName: String,
//     lastName: String,
//     profilePicturePath: String,
//     gender: String,
//     description: String
// }

export interface ScheduleDto{
    id: number|null; 
    date: String,
    appointmentNumber: number,
    usersAppointment: boolean
}