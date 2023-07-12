import { createAction, props } from "@ngrx/store";
import { TherapistsPatientListItem, TherapistsScheduleListItem } from "src/app/models/therapist";

export const loadTherapistsPatients = createAction("Load Patient List For Therapist", props<{therapistId: number}>());
export const loadTherapistsPatientsSuccess = createAction("Load Patient List For Therapist - Success", props<{items: TherapistsPatientListItem[]}>());
export const loadTherapistsSchedule = createAction("Load Schedule", props<{therapistId: number}>());
export const loadTherapistsScheduleSuccess = createAction("Load Schedule - Success", props<{appointmentList: TherapistsScheduleListItem[]}>());
//export const loadTherapistsScheduleForDate = createAction("Load Schedule For Date", props<{therapistId: number, date: String}>());
//export const loadTherapistsScheduleForDateSuccess = createAction("Load Schedule For Date - Success", props<{appointmentList: TherapistsScheduleListItem[]}>());
export const updateNote = createAction("Update Note For Patient", props<{patientId: number, note: String}>());
export const updateNoteSuccess = createAction("Update Note For Patient - Success", props<{patient: TherapistsPatientListItem}>());