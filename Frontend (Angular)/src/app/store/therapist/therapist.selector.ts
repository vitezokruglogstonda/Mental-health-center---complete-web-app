import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const selectTherapistsPatientList = createSelector(
    (state: AppState) => state.therapistsPatientList,
    (therapistsPatientList) => therapistsPatientList.ids.map(id => therapistsPatientList.entities[id])
); 

export const selectTherapistsPatient = (patientId: number) => createSelector(
    selectTherapistsPatientList,
    (therapistsPatientList) => therapistsPatientList.find((patient) => {
        if(patient)
            if(patient.id)
                return patient.id === patientId;
        return null;
    })
);

export const selectTherapistsScheduleList = createSelector(
    (state: AppState) => state.therapistsScheduleList,
    (therapistsScheduleList) => therapistsScheduleList.ids.map(id => therapistsScheduleList.entities[id])
);

export const selectTherapistsScheduleListByDate = (date: String) => createSelector(
    selectTherapistsScheduleList,
    (therapistsScheduleList) => therapistsScheduleList.filter( item => item?.date === date)
);
