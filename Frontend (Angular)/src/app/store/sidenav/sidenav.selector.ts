import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const selectSidenavInfo = createSelector(
    (state: AppState) => state.sidenavInfo,
    (sidenavInfo) => sidenavInfo.ids.map(id => sidenavInfo.entities[id])
); 
