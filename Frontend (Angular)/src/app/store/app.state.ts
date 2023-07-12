import { TherapistComponent } from "../components/therapist/therapist.component";
import { AdminUserListState } from "../models/admin";
import { AppInfo } from "../models/app-info";
import { HelpCallListState } from "../models/help-call-dto";
import { ScheduleDtoState, TherapistListState } from "../models/patient";
import { SidenavInfoState } from "../models/sidenav-info";
import { TherapistsPatientListState, TherapistsScheduleListState } from "../models/therapist";
import { User } from "../models/user";


export interface AppState {
    appInfo: AppInfo;
    sidenavInfo: SidenavInfoState;
    userInfo: User;
    helpCallRequestList: HelpCallListState;
    therapistsPatientList: TherapistsPatientListState;
    therapistsScheduleList: TherapistsScheduleListState;
    patientsTherapistList: TherapistListState;
    //patientsTherapistInfo: TherapistInfoDto;
    patientsTherapistSchedule: ScheduleDtoState;
    adminUserList: AdminUserListState;
}

