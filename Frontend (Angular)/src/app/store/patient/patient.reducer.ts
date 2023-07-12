import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { ScheduleDto, ScheduleDtoState, TherapistListItem, TherapistListState } from "src/app/models/patient";
import * as PatientActions from "./patient.action";



export const patientsTherapistListAdapter: EntityAdapter<TherapistListItem> = createEntityAdapter<TherapistListItem>();

export const initialPatientListState: TherapistListState = patientsTherapistListAdapter.getInitialState({
});

export const scheduleAdapter: EntityAdapter<ScheduleDto> = createEntityAdapter<ScheduleDto>();

export const initialScheduleListState: ScheduleDtoState = scheduleAdapter.getInitialState({
});

export const patientsTherapistListReducer = createReducer(
    initialPatientListState,
    on(PatientActions.loadTherapistList, (state) => ({
        ...state
    })),
    on(PatientActions.loadTherapistListSuccess, (state, { items }) => {
        return patientsTherapistListAdapter.addMany(items, state);
    }),
    on(PatientActions.chooseTherapist, (state, { therapistId }) => ({
        ...state
    }))
    //akcija chooseTherapistSuccess ?
);

export const patientReducer = createReducer(
    initialScheduleListState,
    on(PatientActions.loadTherapistSchedule, (state, {}) => ({
        ...state
    })),
    on(PatientActions.loadTherapistScheduleSuccess, (state, { schedule }) => {
        return scheduleAdapter.addMany(schedule, state);
    }),
    on(PatientActions.makeAnAppointment, (state, {date, appointmentNumber }) => ({
        ...state
    })),
    on(PatientActions.makeAnAppointmentSuccess, (state, { scheduleDto }) => {
        return scheduleAdapter.addOne(scheduleDto, state);
    }),
    on(PatientActions.cancelAppointment, (state, { scheduleId }) => ({
        ...state
    })),
    on(PatientActions.cancelAppointmentSuccess, (state, { scheduleId }) => {
        return scheduleAdapter.removeOne(scheduleId, state);
    }),
);

