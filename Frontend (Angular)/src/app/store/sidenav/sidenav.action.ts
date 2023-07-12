import { createAction, props } from "@ngrx/store";
import { SidenavListItem } from "src/app/models/sidenav-info";

export const loadItemsOffline = createAction("Load Sidenav Items - Offline Mode");
export const loadItemsOfflineSuccess = createAction("Load Sidenav Items - Offline Mode - Success", props<{items: SidenavListItem[]}>());