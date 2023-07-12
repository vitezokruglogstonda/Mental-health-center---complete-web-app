import { createEntityAdapter, EntityAdapter, Update } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { TherapistsPatientListItem, TherapistsPatientListState, TherapistsScheduleListItem, TherapistsScheduleListState } from "src/app/models/therapist";
import * as TherapistActions from "./therapist.action";

export const therapistsPatientListAdapter: EntityAdapter<TherapistsPatientListItem> = createEntityAdapter<TherapistsPatientListItem>();

export const initialPatientListState: TherapistsPatientListState = therapistsPatientListAdapter.getInitialState({
});

export const therapistPatientListReducer = createReducer(
    initialPatientListState,
    on(TherapistActions.loadTherapistsPatients, (state, {therapistId}) => ({
        ...state
    })),
    on(TherapistActions.loadTherapistsPatientsSuccess, (state, {items}) => {
        return therapistsPatientListAdapter.addMany(items, state);
    }),
    on(TherapistActions.updateNote, (state, {patientId, note}) => ({
        ...state
    })),
    on(TherapistActions.updateNoteSuccess, (state, {patient}) => {
        return therapistsPatientListAdapter.updateOne({id: (patient.id as number), changes: patient}, state);
    })
);

export const therapistsScheduleListAdapter: EntityAdapter<TherapistsScheduleListItem> = createEntityAdapter<TherapistsScheduleListItem>();

export const initialScheduleListState: TherapistsScheduleListState = therapistsScheduleListAdapter.getInitialState({
});

export const therapistScheduleListReducer = createReducer(
    initialScheduleListState,
    // on(TherapistActions.loadTherapistsScheduleForDate, (state, {therapistId, date}) => ({
    //     ...state
    // })),
    // on(TherapistActions.loadTherapistsScheduleForDateSuccess, (state, {appointmentList}) => {
    //     return therapistsScheduleListAdapter.addMany(appointmentList, state);
    // })
    on(TherapistActions.loadTherapistsSchedule, (state, {therapistId}) => ({
        ...state
    })),
    on(TherapistActions.loadTherapistsScheduleSuccess, (state, {appointmentList}) => {
        return therapistsScheduleListAdapter.addMany(appointmentList, state);
    })
);