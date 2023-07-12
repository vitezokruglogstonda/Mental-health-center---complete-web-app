import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, of, Subject, switchMap, take } from "rxjs";
import { environment } from "src/environments/environment";
import { TherapistsPatientListItem, TherapistsScheduleListItem } from "../models/therapist";
import { User, UserType } from "../models/user";

interface Note {
    id: number;
    patientId: number;
    note: String;
}

@Injectable({
    providedIn: 'root'
})
export class TherapistService {

    constructor(private http: HttpClient) { }

    getPatientList(therapistId: number): Observable<TherapistsPatientListItem[]> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            withCredentials: true,
        };
        let querry: String = `therapist/get-patient-list`;
        return this.http.get<TherapistsPatientListItem[]>(environment.server_url + querry, httpOptions).pipe(
            switchMap((userList: TherapistsPatientListItem[]) => {
                return of(userList);
            })
        );
    }

    updateNoteForPatient(patientId: number, note: String): Observable<TherapistsPatientListItem> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            withCredentials: true,
        };

        let querry: String = `therapist/update-note`;
        return this.http.put<TherapistsPatientListItem>(environment.server_url + querry, {patientId: patientId, note: note}, httpOptions).pipe(
            switchMap((patient: TherapistsPatientListItem)=>{
                return of(patient);
            })
        )
    }

    getSchedule(therapistId: number): Observable<TherapistsScheduleListItem[]> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            withCredentials: true,
        };
        let querry: String = `therapist/get-schedule`;
        return this.http.get<TherapistsScheduleListItem[]>(environment.server_url + querry, httpOptions).pipe(
            switchMap((schedule: TherapistsScheduleListItem[]) => {
                return of(schedule);
            })
        );
    }

}