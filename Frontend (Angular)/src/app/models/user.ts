export interface User {
    id: number | null;
    email: String;
    firstName: String;
    lastName: String;
    birthDate: CustomDate;
    gender: String;
    userType: UserType;
    phoneNumber: String;
    profilePicturePath: String;
    password: String;
    therapistID: number | null;
    note: String | null;
    description: String | null;
}

export enum UserType {
    Admin,
    Therapist,
    Patient,
    CallOperator,
    Guest
}

export interface LoginDto {
    email: String;
    password: String;
}

export interface RegisterDto {
    email: String;
    password: String;
    firstName: String;
    lastName: String;
    birthDate: CustomDate | null;
    gender: String;
    phoneNumber: String;
    profilePicture: File | null;
}

export interface CustomDate{
    year: number,
    month: number,
    day: number
}