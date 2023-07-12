import { createAction, props } from "@ngrx/store";
import { HelpCallListItem } from "src/app/models/help-call-dto";

export const loadHelpCallsRequests = createAction("Load Help Call Requests");
export const loadHelpCallsRequestsSuccess = createAction("Load Help Call Requests - Success", props<{items: HelpCallListItem[]}>());
export const finishRequest = createAction("Help Call Request Finished", props<{requestId: number}>());
export const finishRequestSuccess = createAction("Help Call Request Finished - Success", props<{requestId: number}>());
export const newCallArrived = createAction("New Help Call Arrived", props<{item: HelpCallListItem}>());