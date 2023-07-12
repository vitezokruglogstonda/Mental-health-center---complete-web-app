import { formatDate } from "@angular/common";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { from, map, of, switchMap, tap } from "rxjs";
import { LoginDto, User } from "src/app/models/user";
import { UserService } from "src/app/services/user.service";
import * as UserActions from "./user.action";
import * as AppActions from "../app/app.action";
import { LoginStatus } from "src/app/models/app-info";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";

@Injectable()
export class UserEffects {
    constructor(private actions$: Actions, private userService: UserService, private store: Store<AppState>) { }

    logIn = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.logIn),
            switchMap((action) =>
                this.userService.logIn(action.loginDto).pipe(
                    switchMap((user: User|null) => {
                        if (user) {
                            return [
                                UserActions.logInSuccess({ user: user }),
                                AppActions.changeStatus({ loginStatus: LoginStatus.Online, imagePath: user.profilePicturePath })
                            ];
                        } else {
                            return [AppActions.loginFail()];
                        }
                    })
                )
            )
        )
    );

    register = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.register),
            switchMap((action) =>
                this.userService.register(action.registerDto).pipe(
                    switchMap((user: User) => {
                        if (user) {
                            return [
                                UserActions.logInSuccess({ user: user }),
                                AppActions.changeStatus({ loginStatus: LoginStatus.Online, imagePath: user.profilePicturePath })
                            ];
                        } else {
                            return [AppActions.registerFail()];
                        }
                    })
                )
            )
        )
    );

    mailCheck = createEffect(() =>
    this.actions$.pipe(
        ofType(UserActions.checkEmail),
        switchMap((action) =>
            this.userService.findUserByMail(action.mail).pipe(
                switchMap((result: boolean) => {
                    if (result) {
                        return [AppActions.updateEmailError({ status: true })];
                    } else {
                        return [AppActions.updateEmailError({ status: false })];
                    }
                })
            )
        )
    ));
    
    signOut = createEffect(() =>
    this.actions$.pipe(
        ofType(UserActions.signOut),
        switchMap((action) =>
            this.userService.signOut().pipe(
                switchMap((result: boolean) => {
                    return [UserActions.signOutSuccess()];
                })
            )
        )
    ));

}