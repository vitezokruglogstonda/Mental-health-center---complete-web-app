import { createAction, props } from "@ngrx/store";
import { LoginDto, RegisterDto, User } from "src/app/models/user";

export const logIn = createAction("Log In", props<{loginDto : LoginDto}>());
export const logInSuccess = createAction("Log In - Success", props<{user: User}>());
export const signOut = createAction("Sign Out");
export const signOutSuccess = createAction("Sign Out - Success");
export const register = createAction("Register", props<{registerDto: RegisterDto}>());
export const checkEmail = createAction("Mail check", props<{mail: String}>());
export const chooseTherapistSuccess = createAction("Choose Therapist - Success", props<{therapistId: number}>());