import { Injectable } from "@angular/core";
import { act, Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { Observable, switchMap, tap } from "rxjs";
import { HelpCallListItem } from "src/app/models/help-call-dto";
import { OperatorService } from "src/app/services/operator.service";
import { AppState } from "../app.state";
import * as OpDashboardActions from "./operator-dashboard.action";

@Injectable()
export class OperatorEffects {
    constructor(private actions$: Actions, private operatorService: OperatorService, private store: Store<AppState>) { }


    loadHelpCallRequests = createEffect(() =>
        this.actions$.pipe(
            ofType(OpDashboardActions.loadHelpCallsRequests),
            switchMap(async (action) =>
                this.operatorService.getHelpCallRequests()
            )
        )
        , { dispatch: false });

    loadHelpCallRequestsSuccess = createEffect(() =>
        this.operatorService.call_list.pipe(
            switchMap((items: HelpCallListItem[]) => {
                return [OpDashboardActions.loadHelpCallsRequestsSuccess({ items: items })];
            })
        )
    )

    finishRequest = createEffect(() =>
        this.actions$.pipe(
            ofType(OpDashboardActions.finishRequest),
            switchMap(async (action) =>
                this.operatorService.finishHelpCallRequest(action.requestId)
            )
        )
        , { dispatch: false });

    finishRequestSuccess = createEffect(() =>
        this.operatorService.removed_call.pipe(
            switchMap((id: number) => {
                return [OpDashboardActions.finishRequestSuccess({ requestId: id })];
            })
        )
    )

    newCall = createEffect(() =>
        this.operatorService.new_call.pipe(
            switchMap((item: HelpCallListItem) => {
                return [OpDashboardActions.newCallArrived({ item: item })];
            })
        )
    )
}