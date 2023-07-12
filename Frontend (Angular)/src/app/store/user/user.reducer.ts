import { createReducer, on } from "@ngrx/store";
import { LoginStatus } from "src/app/models/app-info";
import { User, UserType } from "src/app/models/user";
//import { logIn } from "./user.action";
import * as Actions from "./user.action";

export const initialState: User = {
    id: 0,
    email: "",
    firstName: "",
    lastName: "",
    birthDate: {
        year: 0,
        month: 0,
        day: 0
    },
    gender: "",
    phoneNumber: "",
    userType: UserType.Guest,
    profilePicturePath: "",
    password: "",
    therapistID: null,
    note: "",
    description: "",
};

export const userReducer = createReducer(
    initialState,
    on(Actions.logIn, (state, {loginDto}) => ({...state})),
    on(Actions.logInSuccess, (state, {user}) => ({
        ...user,
    })),
    on(Actions.signOut, (state)=>({
        ...state
    })),
    on(Actions.signOutSuccess, (state)=>({
        ...initialState
    })),
    on(Actions.register, (state, {registerDto}) => ({...state})),
    on(Actions.checkEmail, (state, {mail}) => ({...state})),
    on(Actions.chooseTherapistSuccess, (state, {therapistId}) => ({
        ...state,
        therapistID: therapistId
    })),
);