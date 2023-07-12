import { Injectable } from "@angular/core";
import { act, Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { switchMap } from "rxjs";
import { ScheduleDto, TherapistListItem } from "src/app/models/patient";
import { User } from "src/app/models/user";
import { PatientService } from "src/app/services/patient.service";
import { AppState } from "../app.state";
import * as PatientActions from "./patient.action";
import * as UserActions from "../user/user.action";
import { TherapistsScheduleListItem } from "src/app/models/therapist";

@Injectable()
export class PatientEffects{
    constructor(private actions$: Actions, private patientService: PatientService, private store: Store<AppState>) { }

    loadTherapistList = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientActions.loadTherapistList),
            switchMap(() =>
                this.patientService.getTherapistList().pipe(
                    switchMap((items: TherapistListItem[]) => {
                        return [
                            PatientActions.loadTherapistListSuccess({ items: items })
                        ];
                    })
                )
            )
        )
    );

    chooseTherapist = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientActions.chooseTherapist),
            switchMap((action) =>
                this.patientService.chooseTherapist(action.therapistId).pipe(
                    switchMap((id: number) => {
                        return [
                            UserActions.chooseTherapistSuccess({ therapistId: id })
                        ];
                    })
                )
            )
        )
    );

    loadTherapist = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientActions.loadTherapistSchedule),
            switchMap((action) =>
                this.patientService.loadTherapistSchedule().pipe(
                    switchMap((schedules: ScheduleDto[]) => {
                        return [
                            PatientActions.loadTherapistScheduleSuccess({ schedule: schedules })
                        ];
                    })
                )
            )
        )
    );

    makeAnAppointment = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientActions.makeAnAppointment),
            switchMap((action) =>
                this.patientService.makeAnAppointment(action.date, action.appointmentNumber).pipe(
                    switchMap((schedule: ScheduleDto) => {
                        return [
                            PatientActions.makeAnAppointmentSuccess({scheduleDto: schedule})
                        ];
                    })
                )
            )
        )
    );

    cancelAnAppointment = createEffect(() =>
        this.actions$.pipe(
            ofType(PatientActions.cancelAppointment),
            switchMap((action) =>
                this.patientService.cancelAnAppointment(action.scheduleId).pipe(
                    switchMap((scheduleId: number) => {
                        return [
                            PatientActions.cancelAppointmentSuccess({scheduleId: scheduleId})
                        ];
                    })
                )
            )
        )
    );
}