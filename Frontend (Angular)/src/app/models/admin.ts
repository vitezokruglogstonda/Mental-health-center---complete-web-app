import { EntityState } from "@ngrx/entity";
import { CustomDate, UserType } from "./user";

export interface UserListItem{
    id: number|null;
    email: String;
    password: String;
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

export interface AdminUserListState extends EntityState<UserListItem>{

}

