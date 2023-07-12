import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { switchMap } from "rxjs";
import { HelpCallStatus } from "src/app/models/app-info";
import { Quote } from "src/app/models/home-page-objects";
import { AppService } from "src/app/services/app.service";
import { AppState } from "../app.state";
import * as AppActions from "./app.action";

@Injectable()
export class AppEffects {
    constructor(private actions$: Actions, private appService: AppService, private store: Store<AppState>) { }

    fatchQuotes = createEffect(() =>
        this.actions$.pipe(
            ofType(AppActions.fetchQuotes),
            switchMap((action) =>
                this.appService.getUserQuotes().pipe(
                    switchMap((quotes: Quote[]) => {
                        return [
                            AppActions.fetchQuotesSuccess({ quotes: quotes })
                        ];
                    })
                )
            )
        )
    );

    helpCallRequest = createEffect(() =>
        this.actions$.pipe(
            ofType(AppActions.helpCallRequest),
            switchMap(async (action) =>
                this.appService.helpCallRequest(action.request_name, action.request_number)
            )
        )
        , { dispatch: false });

    helpCallRequestSuccess = createEffect(() =>
        this.appService.help_call_status.pipe(
            switchMap((requestResponse: boolean) => {
                let status: HelpCallStatus;
                if(requestResponse){
                    status = HelpCallStatus.Requested;
                }else{
                    status = HelpCallStatus.Pending;
                }
                return [AppActions.helpCallResponse({helpCallStatus: status})];
            })
        )
    )
}