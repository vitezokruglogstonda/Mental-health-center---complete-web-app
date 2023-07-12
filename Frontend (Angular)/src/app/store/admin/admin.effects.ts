import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { switchMap } from "rxjs";
import { UserListItem } from "src/app/models/admin";
import { AdminService } from "src/app/services/admin.service";
import { AppState } from "../app.state";
import * as AdminActions from "./admin.action";

@Injectable()
export class AdminEffects {
    constructor(private actions$: Actions, private adminService: AdminService, private store: Store<AppState>) { }

    loadUserList = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.loadUserList),
            switchMap((action) =>
                this.adminService.getUserList().pipe(
                    switchMap((users: UserListItem[]) => {
                        return [
                            AdminActions.loadUserListSuccess({ users: users })
                        ];
                    })
                )
            )
        )
    );

    deleteUser = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.deleteUser),
            switchMap((action) =>
                this.adminService.deleteUser(action.userId).pipe(
                    switchMap((userId: number) => {
                        return [
                            AdminActions.deleteUserSuccess({ userId: userId })
                        ];
                    })
                )
            )
        )
    );

    addUser = createEffect(() =>
        this.actions$.pipe(
            ofType(AdminActions.addNewUser),
            switchMap((action) =>
                this.adminService.addNewUser(action.data, action.picture).pipe(
                    switchMap((newUser: UserListItem) => {
                        return [
                            AdminActions.addNewUserSuccess({ newUser: newUser })
                        ];
                    })
                )
            )
        )
    );

    changeUsersPassword = createEffect(() =>
    this.actions$.pipe(
        ofType(AdminActions.changeUsersPassword),
        switchMap((action) =>
            this.adminService.changeUsersPassword(action.userId, action.password).pipe(
                switchMap((userUpdate: UserListItem) => {
                    return [
                        AdminActions.changeUsersPasswordSuccess({ userUpdate: userUpdate })
                    ];
                })
            )
        )
    )
);

}