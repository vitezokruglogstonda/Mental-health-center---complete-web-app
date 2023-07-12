import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const selectHelpCallRequests = createSelector(
    (state: AppState) => state.helpCallRequestList,
    (helpCallRequestList) => helpCallRequestList.ids.map(id => helpCallRequestList.entities[id])
); 
