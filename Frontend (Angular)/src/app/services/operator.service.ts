import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { Observable, of, switchMap, take } from "rxjs";
import { environment } from "src/environments/environment";
import { HelpCallListItem } from "../models/help-call-dto";
import { SocketService } from "./socket.service";

@Injectable({
    providedIn: 'root'
})
export class OperatorService {

    call_list: Observable<HelpCallListItem[]>;
    new_call: Observable<HelpCallListItem>;
    removed_call: Observable<number>;

    constructor(private http: HttpClient, private socket: SocketService) {
        this.call_list = this.socket.listen("getHelpCalls");
        this.new_call = this.socket.listen("addCall");
        this.removed_call = this.socket.listen("callDone");
    }

    getHelpCallRequests() {
        this.socket.emit("getHelpCalls");
    }

    finishHelpCallRequest(id: number){
        this.socket.emit("callDone", id);
    }

}