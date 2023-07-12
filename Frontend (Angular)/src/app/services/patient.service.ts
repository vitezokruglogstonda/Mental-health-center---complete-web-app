import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, of, switchMap } from "rxjs";
import { environment } from "src/environments/environment";
import { ScheduleDto, TherapistListItem } from "../models/patient";
import { TherapistsScheduleListItem } from "../models/therapist";
import { User, UserType } from "../models/user";

@Injectable({
    providedIn: 'root'
})
export class PatientService {

    constructor(private http: HttpClient) { }

    getTherapistList(): Observable<TherapistListItem[]> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            withCredentials: true,
        };
        
        let querry: String = `patient/get-therapist-list`;
        return this.http.get<TherapistListItem[]>(environment.server_url + querry, httpOptions).pipe(
            switchMap((result: TherapistListItem[])=>{
                return of(result)
            })
        )
    }

    chooseTherapist(therapistId: number): Observable<number> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            withCredentials: true,
        };

        let querry: String = `patient/choose-therapist`;
        return this.http.put<number>(environment.server_url + querry, {therapistId: therapistId}, httpOptions).pipe(
            switchMap((id: number) => {
                return of(id);
            })
        )
    }

    loadTherapistSchedule(): Observable<ScheduleDto[]> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            withCredentials: true,
        };
        let querry = `patient/get-therapist-schedule`;
        return this.http.get<ScheduleDto[]>(environment.server_url + querry, httpOptions).pipe(
            switchMap((schedule: ScheduleDto[]) => {
                return of(schedule);
            })
        )
    }

    makeAnAppointment(date: string, appointmentNumber: number): Observable<ScheduleDto> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            withCredentials: true,
        };
        let querry: String = `patient/make-an-appointment`;
        return this.http.put<ScheduleDto>(environment.server_url + querry, {date: date, appointmentNumber: appointmentNumber}, httpOptions).pipe(
            switchMap((appointment: ScheduleDto) => {
                return of(appointment);
            })
        )
    }

    cancelAnAppointment(scheduleId: number): Observable<number>{
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            withCredentials: true,
        };
        let querry: String = `patient/cancel-an-appointment/${scheduleId}`;
        return this.http.delete(environment.server_url + querry, httpOptions).pipe(
            switchMap(() => {
                return of (scheduleId);
            })
        );
    }

}