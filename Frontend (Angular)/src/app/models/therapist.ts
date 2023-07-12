import { EntityState } from "@ngrx/entity";
import { CustomDate } from "./user";

export interface TherapistsPatientListItem{
    id: number|null;
    email: String;
    firstName: String;
    lastName: String;
    birthDate: CustomDate;
    gender: String;
    phoneNumber: String;
    profilePicturePath: String;
    note: String;
}

export interface TherapistsPatientListState extends EntityState<TherapistsPatientListItem>{

}

export interface TherapistsScheduleListItem{
    id: number | null;
    therapistID: number,
    date: String,
    appointmentNumber: number,
    patientId: number
}

export interface TherapistsScheduleListState extends EntityState<TherapistsScheduleListItem>{

}