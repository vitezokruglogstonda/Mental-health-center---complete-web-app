import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const selectAllUsers = createSelector(
    (state: AppState) => state.adminUserList,
    (adminUserList) => adminUserList.ids.map(id => adminUserList.entities[id])
); 