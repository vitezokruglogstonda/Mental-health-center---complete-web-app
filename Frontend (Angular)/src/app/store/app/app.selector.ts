import { createSelector } from "@ngrx/store";
import { LoginStatus } from "src/app/models/app-info";
import { AppState } from "../app.state";

export const selectAppInfo = createSelector(
    (state: AppState) => state.appInfo,
    (account_info) => account_info
); 

export const selectEmailExample = createSelector(
    selectAppInfo,
    (state) => state.emailExample
);

export const selectLoginErrorStatus = createSelector(
    selectAppInfo,
    (state) => state.loginError
);

export const selectLoginStatus = createSelector(
    selectAppInfo,
    (state) => state.loginStatus
);

export const selectRegisterErrorStatus = createSelector(
    selectAppInfo,
    (state) => state.registerError
);

export const selectEmailTaken = createSelector(
    selectAppInfo,
    (state) => state.emailTaken
);

export const selectQuotes = createSelector(
    selectAppInfo,
    (state) => state.quotes
);

export const selectHelpCallStatus = createSelector(
    selectAppInfo,
    (state) => state.helpCallStatus
);