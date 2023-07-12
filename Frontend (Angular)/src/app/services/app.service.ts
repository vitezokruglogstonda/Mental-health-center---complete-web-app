import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ofType } from "@ngrx/effects";
import { Observable, of, switchMap } from "rxjs";
import { environment } from "src/environments/environment";
import { HelpCallStatus } from "../models/app-info";
import { HelpCallListItem } from "../models/help-call-dto";
//import { helpCallDto, Quote } from "../models/home-page-objects";
import { Quote } from "../models/home-page-objects";
import { SidenavListItem } from "../models/sidenav-info";
import { SocketService } from "./socket.service";

@Injectable({
    providedIn: 'root'
})
export class AppService {

    help_call_status: Observable<boolean>;

    constructor(private http: HttpClient, private socket: SocketService) { 
        this.help_call_status = this.socket.listen("getStatus");
    }

    getSidenavItems_offline(): Observable<SidenavListItem[]> {
        let querry: String = `get-sidenav-items`;
        return this.http.get<SidenavListItem[]>(environment.server_url + querry);
    }

    getUserQuotes(): Observable<Quote[]> {
        let querry: String = `user-quotes`;
        return this.http.get<Quote[]>(environment.server_url + querry);
    }

    helpCallRequest(name: String, phone: String) {

        this.socket.emit("addCall", {name: name, phone: phone});
        
    }

}