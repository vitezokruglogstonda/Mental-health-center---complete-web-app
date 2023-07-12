import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const selectTherapistList = createSelector(
    (state: AppState) => state.patientsTherapistList,
    (patientsTherapistList) => patientsTherapistList.ids.map(id => patientsTherapistList.entities[id])
); 

// export const selectTherapistDto = createSelector(
//     (state: AppState) => state.patientsTherapist,
//     (patientsTherapist) => patientsTherapist
// );

// export const selectTherapistInfo = createSelector(
//     selectTherapistDto,
//     (therapistDto) => therapistDto.therapistInfo
// );

export const selectTherapistSchedule = createSelector(
    (state: AppState) => state.patientsTherapistSchedule,
    (schedule) => schedule.ids.map(id => schedule.entities[id])
);

export const selectScheduleByDate = (date: String) => createSelector(
    selectTherapistSchedule,
    (schedule) => schedule.filter(el => el?.date === date)
);

// export const selectScheduleByDate = (date: String) => createSelector(
//     (state: AppState) => state.patientsTherapistSchedule,
//     (schedule) => schedule.ids.map(id => schedule.entities[id]).filter(el => el?.date === date)
// );

export const selectScheduleDto = (date: String, appointmentNumber: number) => createSelector(
    selectTherapistSchedule,
    (schedule) => schedule.find(el => el?.date === date && el?.appointmentNumber === appointmentNumber)
);