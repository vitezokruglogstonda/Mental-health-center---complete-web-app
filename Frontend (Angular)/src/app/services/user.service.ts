import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of, Subject, switchMap } from "rxjs";
import { environment } from "src/environments/environment";
import { LoginDto, RegisterDto, User, CustomDate, UserType } from "../models/user";
import * as UserActions from "../store/user/user.action";
import * as AppActions from "../store/app/app.action";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    logIn(loginDto: LoginDto): Observable<User | null> {
        let querry: String = "user/logIn";
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'my-auth-token'
            }),
            withCredentials: true,
        };
        return this.http.put<User>(environment.server_url + querry, loginDto, httpOptions).pipe(
            switchMap((response: User) => {
                return of(response)
            }),
            catchError( () => {
                return of(null);
            })
        );
    }

    register(registerDto: RegisterDto): Observable<User> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'my-auth-token'
            }),
            withCredentials: true,
        };

        const { profilePicture, ...uploadObject } = registerDto;
        
        let querry: String = `user/register`;
        return this.http.post<{ id: number }>(environment.server_url + querry, uploadObject, httpOptions).pipe(
            switchMap((response: { id: number }) => {
                if (registerDto.profilePicture) {
                    let picture_querry: String = `user/upload-profile-picture/${response.id}`;
                    const formData = new FormData();
                    formData.append("file", registerDto.profilePicture, registerDto.profilePicture.name);
                    return this.http.post<{path: string}>(environment.server_url + picture_querry, formData).pipe(
                        switchMap((picture_response: {path: string}) => {
                            let login_querry: String = `user/logIn`;
                            return this.http.put<User>(environment.server_url + login_querry, { email: registerDto.email, password: registerDto.password }, httpOptions).pipe(
                                switchMap((user: User) => {
                                    return of(user)
                                })
                            );
                        })
                    );
                } else {
                    let login_querry: String = `user/logIn`;
                    return this.http.put<User>(environment.server_url + login_querry, { email: registerDto.email, password: registerDto.password }, httpOptions).pipe(
                        switchMap((user: User) => {
                            return of(user)
                        })
                    );
                }
            })
        );
    }

    findUserByMail(email: String): Observable<boolean> {
        let querry: String = `user/emailExists/${email}`;
        return this.http.get<boolean>(environment.server_url + querry);
    }

    signOut(): Observable<boolean> {
        let querry: String = "user/logOut";
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            withCredentials: true,
        };
        return this.http.put<boolean>(environment.server_url + querry, {}, httpOptions)
            .pipe(
                switchMap((response: boolean) => {
                    return of(response)
                })
            );
    }

}