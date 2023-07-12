import {createReducer, on} from "@ngrx/store"
import { AppInfo, HelpCallStatus, LoginStatus } from "src/app/models/app-info";
import { environment } from "src/environments/environment";
import * as Actions from "./app.action";
import {signOutSuccess} from "../user/user.action";
import { state } from "@angular/animations";

export const initialState: AppInfo = {
    loginStatus: LoginStatus.Offline,
    accountImagePath: environment.account_icon_basic_URL,
    tooltipText: environment.account_icon_tooltip_text,
    emailExample: environment.login_card_example_email,
    loginError: false,
    registerError: false,
    emailTaken: false,
    quotes: [],
    helpCallStatus: HelpCallStatus.NotRequested,
};

export const appReducer = createReducer(
    initialState,
    on(Actions.changeStatus, (state, {loginStatus, imagePath}) => ({
        ...state,
        loginStatus: loginStatus,
        accountImagePath: imagePath,
        loginError: false,
        registerError: false,
    })),
    on(Actions.loginFail, (state) => ({
        ...state,
        loginError: true
    })),
    on(signOutSuccess, (state)=>({
        ...initialState
    })),
    on(Actions.registerFail, (state)=>({
        ...state,
        registerError: true
    })),
    on(Actions.updateEmailError, (state, {status})=>({
        ...state,
        emailTaken: status
    })),
    on(Actions.fetchQuotes, (state)=>({...state})),
    on(Actions.fetchQuotesSuccess, (state, {quotes})=>({
        ...state,
        quotes: quotes
    })),
    on(Actions.helpCallRequest, (state, {request_name, request_number})=> ({
        ...state,
    })),
    on(Actions.helpCallResponse, (state, {helpCallStatus})=> ({
        ...state,
        helpCallStatus: helpCallStatus
    }))
);
