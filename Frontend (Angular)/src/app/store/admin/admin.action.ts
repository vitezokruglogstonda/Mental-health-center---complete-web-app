import { createAction, props } from "@ngrx/store";
import { UserListItem } from "src/app/models/admin";

export const loadUserList = createAction("Load All Users");
export const loadUserListSuccess = createAction("Load All Users - Success", props<{users: UserListItem[]}>());
export const deleteUser = createAction("Delete User", props<{userId: number}>());
export const deleteUserSuccess = createAction("Delete User - Success", props<{userId: number}>());
export const addNewUser = createAction("Add New User", props<{data: UserListItem, picture: File | null}>());
export const addNewUserSuccess = createAction("Add New User - Success", props<{newUser: UserListItem}>());
export const changeUsersPassword = createAction("Change Users Password", props<{userId: number, password: String}>());
export const changeUsersPasswordSuccess = createAction("Change Users Password - Success", props<{userUpdate: UserListItem}>());