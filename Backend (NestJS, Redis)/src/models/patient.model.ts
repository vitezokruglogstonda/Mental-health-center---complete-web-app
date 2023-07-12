import { CustomDate } from "./custom-date.model";

export interface PatientDto{
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