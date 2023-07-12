import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { HelpCallListItem, HelpCallListState } from "src/app/models/help-call-dto";
import * as OpDashboardActions from "./operator-dashboard.action";

export const helpCallListAdapter: EntityAdapter<HelpCallListItem> = createEntityAdapter<HelpCallListItem>();

export const initialState: HelpCallListState = helpCallListAdapter.getInitialState({
});

export const helpCallRequestsReducer = createReducer(
    initialState,
    on(OpDashboardActions.loadHelpCallsRequests, (state) => ({
        ...state
    })),
    on(OpDashboardActions.loadHelpCallsRequestsSuccess, (state, {items}) => {
        return helpCallListAdapter.addMany(items, state);
    }),
    on(OpDashboardActions.finishRequest, (state, {requestId}) => ({
        ...state
    })),
    on(OpDashboardActions.finishRequestSuccess, (state, {requestId}) => {
        return helpCallListAdapter.removeOne(requestId, state);
    }),
    on(OpDashboardActions.newCallArrived, (state, {item}) => {
        return helpCallListAdapter.addOne(item, state);
    })
);
