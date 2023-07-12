import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const selectUserInfo = createSelector(
    (state: AppState) => state.userInfo,
    (userInfo) => userInfo
); 

export const selectUserId = createSelector(
    selectUserInfo,
    (userInfo) => userInfo.id
);

export const selectUserType = createSelector(
    selectUserInfo,
    (userInfo) => userInfo.userType
);


