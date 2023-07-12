import { CustomDate } from "./custom-date.model";

export interface RegisterDto {
    email: String;
    password: String;
    firstName: String;
    lastName: String;
    birthDate: CustomDate | null;
    gender: String;
    phoneNumber: String;
}