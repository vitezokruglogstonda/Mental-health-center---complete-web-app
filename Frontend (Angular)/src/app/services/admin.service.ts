import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ofType } from "@ngrx/effects";
import { onRunEffectsKey } from "@ngrx/effects/src/lifecycle_hooks";
import { Observable, of, switchMap } from "rxjs";
import { environment } from "src/environments/environment";
import { UserListItem } from "../models/admin";
import { User, UserType } from "../models/user";

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    constructor(private http: HttpClient) { }

    getUserList(): Observable<UserListItem[]> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            withCredentials: true,
        };
        let querry: String = `admin/get-user-list`;
        return this.http.get<UserListItem[]>(environment.server_url + querry, httpOptions).pipe(
            switchMap((users: UserListItem[]) => {
                return of(users);
            })
        )
    }

    deleteUser(userId: number): Observable<number> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            withCredentials: true,
        };
        let querry: String = `admin/delete-user/${userId}`;
        return this.http.delete<number>(environment.server_url + querry, httpOptions).pipe(
            switchMap((result: number) => {
                return of(result)
            })
        );
    }

    addNewUser(userData: UserListItem, userPicture: File | null): Observable<UserListItem> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            withCredentials: true,
        };

        const { password, ...uploadObject } = userData;

        let querry: String = `admin/add-user`;
        return this.http.post<UserListItem>(environment.server_url + querry, {uploadObject, password}, httpOptions).pipe(
            switchMap((response: UserListItem) => {
                if (userPicture) {
                    let picture_querry: String = `user/upload-profile-picture/${response.id}`;
                    const formData = new FormData();
                    formData.append("file", userPicture, userPicture.name);
                    return this.http.post<{path: string}>(environment.server_url + picture_querry, formData).pipe(
                        switchMap((picture_response: {path: string}) => {
                           response.profilePicturePath = picture_response.path as String;
                           return of(response);
                        })
                    );
                } else {
                    return of(response)
                }
            })
        );
    }

    changeUsersPassword(userId: number, password: String): Observable<UserListItem> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            withCredentials: true,
        };
        let querry: String = `admin/change-users-password`;
        return this.http.put<UserListItem>(environment.server_url + querry, {id: userId, password: password}, httpOptions).pipe(
            switchMap((result : UserListItem)=>{
                return of(result);
            })
        )
    }

}