import { UserType } from "src/enums/user-type.enum";
import { CustomDate } from "./custom-date.model";

export interface UserDto{
    id: number | null;
    email: String;
    firstName: String;
    lastName: String;
    birthDate: CustomDate;
    gender: String;
    userType: UserType;
    phoneNumber: String;
    profilePicturePath: String;
    therapistID: number | null;
    note: String | null;
    description: String | null;
}

export interface AdminUserListItemDto{
    id: number | null;
    email: String;
    firstName: String;
    lastName: String;
    birthDate: CustomDate;
    gender: String;
    userType: UserType;
    phoneNumber: String;
    profilePicturePath: String;
    therapistID: number | null;
    description: String | null;
    numberOfPatients: number | null;
}

export interface ChangePasswordDto{
    id: number,
    password: string
}