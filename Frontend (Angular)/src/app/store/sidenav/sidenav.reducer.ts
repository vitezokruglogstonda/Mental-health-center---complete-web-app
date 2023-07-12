import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import { ActionCreator, createReducer, on } from "@ngrx/store";
import { TypedAction } from "@ngrx/store/src/models";
import { SidenavInfoState, SidenavListItem } from "src/app/models/sidenav-info";
import { environment } from "src/environments/environment";
import * as SidenavActions from "./sidenav.action";

export const sidenavInfoAdapter: EntityAdapter<SidenavListItem> = createEntityAdapter<SidenavListItem>();

export const initialState: SidenavInfoState = sidenavInfoAdapter.getInitialState({
});

export const sidenavItemsReducer = createReducer(
    initialState,
    on(SidenavActions.loadItemsOffline, (state) => ({
        ...state
    })),
    on(SidenavActions.loadItemsOfflineSuccess, (state, {items}) => {
        return sidenavInfoAdapter.addMany(items, state);
    })
);
