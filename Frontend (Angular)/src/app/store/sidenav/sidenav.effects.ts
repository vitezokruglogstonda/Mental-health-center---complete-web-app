import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { switchMap } from "rxjs";
import { SidenavListItem } from "src/app/models/sidenav-info";
import { AppService } from "src/app/services/app.service";
import { AppState } from "../app.state";
import * as SidenavActions from "../sidenav/sidenav.action";

@Injectable()
export class SidenavEffects {
    constructor(private actions$: Actions, private appService: AppService, private store: Store<AppState>) { }

    loadItemsOffline = createEffect(() =>
        this.actions$.pipe(
            ofType(SidenavActions.loadItemsOffline),
            switchMap((action) =>
                this.appService.getSidenavItems_offline().pipe(
                    switchMap((items: SidenavListItem[]) => {
                        return [
                            SidenavActions.loadItemsOfflineSuccess({ items: items })
                        ];
                    })
                )
            )
        )
    );
}