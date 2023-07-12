import { Quote } from "./home-page-objects";

export interface AppInfo {
    loginStatus: LoginStatus;
    accountImagePath: String;
    tooltipText: String;
    emailExample: String;
    loginError: boolean;
    registerError: boolean;
    emailTaken: boolean;
    quotes: Quote[];
    helpCallStatus: HelpCallStatus;
}

export enum LoginStatus {
    Offline,
    Online
}

export enum CardType {
    LogIn,
    AccountInfo
}

export enum HelpCallStatus{
    NotRequested,
    Pending,
    Requested
}