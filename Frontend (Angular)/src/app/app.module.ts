import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import {StoreDevtoolsModule} from "@ngrx/store-devtools"

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatRippleModule} from '@angular/material/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatMomentDateModule, MomentDateModule } from '@angular/material-moment-adapter';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';

import { AccountIconComponent } from './components/account-icon/account-icon.component';
import { appReducer } from './store/app/app.reducer';
import { AppState } from './store/app.state';
import { sidenavItemsReducer } from './store/sidenav/sidenav.reducer';
import { LoginCardComponent } from './components/login-card/login-card.component';
import { AccountInfoCardComponent } from './components/account-info-card/account-info-card.component';
import { userReducer } from './store/user/user.reducer';
import { UserEffects } from './store/user/user.effects';
import { UploadPictureDialogComponent } from './components/upload-picture-dialog/upload-picture-dialog.component';
import { SidenavEffects } from './store/sidenav/sidenav.effects';
import { FooterComponentComponent } from './components/footer-component/footer-component.component';
import { AppEffects } from './store/app/app.effects';
import { SeekHelpComponent } from './components/seek-help/seek-help.component';
import { OperatorDashboardComponent } from './components/operator-dashboard/operator-dashboard.component';
import { helpCallRequestsReducer } from './store/operator-dashboard/operator-dashboard.reducer';
import { OperatorEffects } from './store/operator-dashboard/operator-dashboard.effects';
import { TherapistComponent } from './components/therapist/therapist.component';
import { therapistPatientListReducer, therapistScheduleListReducer } from './store/therapist/therapist.reducer';
import { TherapistEffects } from './store/therapist/therapist.effects';
import { ScheduleCardComponent } from './components/schedule-card/schedule-card.component';
import { PatientComponent } from './components/patient/patient.component';
import { patientReducer, patientsTherapistListReducer } from './store/patient/patient.reducer';
import { PatientEffects } from './store/patient/patient.effects';
import { PatientScheduleCardComponent } from './components/patient-schedule-card/patient-schedule-card.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { adminReducer } from './store/admin/admin.reducer';
import { AdminEffects } from './store/admin/admin.effects';
import { ChangePasswordDialogComponent } from './components/change-password-dialog/change-password-dialog.component';
//import { RegisterComponent } from './components/register/register.component';
//import { HomePageComponent } from './components/home-page/home-page.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { SocketService } from './services/socket.service';
import { environment } from 'src/environments/environment';

const config: SocketIoConfig = { url: environment.server_url, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    AccountIconComponent,
    LoginCardComponent,
    AccountInfoCardComponent,
    routingComponents,
    UploadPictureDialogComponent,
    FooterComponentComponent,
    SeekHelpComponent,
    OperatorDashboardComponent,
    TherapistComponent,
    ScheduleCardComponent,
    PatientComponent,
    PatientScheduleCardComponent,
    AdminPageComponent,
    ChangePasswordDialogComponent,
  ],
  entryComponents:[UploadPictureDialogComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot<AppState>({
      appInfo: appReducer,
      sidenavInfo: sidenavItemsReducer,
      userInfo: userReducer,
      helpCallRequestList: helpCallRequestsReducer,
      therapistsPatientList: therapistPatientListReducer,
      therapistsScheduleList: therapistScheduleListReducer,
      patientsTherapistList: patientsTherapistListReducer,
      //patientsTherapistInfo: patientReducer,
      patientsTherapistSchedule: patientReducer,
      adminUserList: adminReducer,
    }),
    EffectsModule.forRoot([UserEffects, SidenavEffects, AppEffects, OperatorEffects, TherapistEffects, PatientEffects, AdminEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 7, 
      autoPause: true
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatTooltipModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MomentDateModule,
    MatSelectModule,
    MatDialogModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatTabsModule,
    MatMomentDateModule,
    //MatNativeDateModule
    SocketIoModule.forRoot(config)
  ],
  providers: [MatDatepickerModule, SocketService],
  bootstrap: [AppComponent],
})
export class AppModule { }
