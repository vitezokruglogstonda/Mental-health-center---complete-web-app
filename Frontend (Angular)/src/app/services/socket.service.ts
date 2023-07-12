import { Injectable } from "@angular/core";
import { Socket } from "ngx-socket-io";
import { Observable } from "rxjs";

@Injectable()
export class SocketService {

  constructor(private socket: Socket) {
    
  }
  
  emit(event: string, data?: any) {
    this.socket.emit(event, data);
  }

  listen(event: string): Observable<any> {
    return new Observable( observer => {
      this.socket.on(event, (data: any) => {
        observer.next(data);
      });
    });
  }

}