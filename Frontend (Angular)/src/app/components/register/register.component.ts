import { Component, ElementRef, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UploadPictureDialogComponent } from '../upload-picture-dialog/upload-picture-dialog.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { CustomDate, RegisterDto, UserType } from 'src/app/models/user';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { checkEmail, register } from 'src/app/store/user/user.action';
import { selectEmailTaken, selectLoginStatus, selectRegisterErrorStatus } from 'src/app/store/app/app.selector';
import { Router } from '@angular/router';
import { LoginStatus } from 'src/app/models/app-info';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class RegisterComponent implements OnInit {

  public email: String;
  public emailError: boolean;
  public emailExample: String;
  public emailPattern: String;
  public emailErrorMessage_Invalid: String;
  public emailErrorMessage_Taken: String;
  public password: String;
  public passwordErrorMessage: String;
  public passwordHint: String;
  public passwordHide: boolean;
  public passwordRep: String;
  public passwordRepError: boolean;
  public passwordRepErrorMessage: String;
  public firstName: String;
  public lastName: String;
  public birthDate: CustomDate | null;
  public userGender: String;
  public phoneNumber: String;
  public phoneNumberLength: number;
  public gendersList: String[];
  public defaultPicturePath: String;
  public uploadedPicture: File | null;
  public userPictureExists: boolean;
  public showBadge: boolean;
  public registrationError: boolean;
  public registrationErrorMessage: String;

  constructor(public dialog: MatDialog, private elRef: ElementRef, private store: Store<AppState>, private router: Router) {
    this.email = "";
    this.emailError = false;
    this.emailExample = environment.login_card_example_email;
    this.emailPattern = environment.email_pattern;
    this.emailErrorMessage_Invalid = environment.email_errorMessage_Invalid;
    this.emailErrorMessage_Taken = environment.email_errorMessage_Taken;
    this.password = "";
    this.passwordErrorMessage = environment.password_errorMessage;
    this.passwordHint = environment.password_hint;
    this.passwordHide = true;
    this.passwordRep = "";
    this.passwordRepError = false;
    this.passwordRepErrorMessage = environment.password_rep_errorMessage;
    this.firstName = "";
    this.lastName = "";
    this.birthDate = null;
    this.userGender = "";
    this.phoneNumber = "";
    this.phoneNumberLength = environment.seek_help.phone_number_length;
    this.gendersList = environment.gender_list;
    this.defaultPicturePath = environment.account_icon_basic_URL;
    this.uploadedPicture = null;
    this.userPictureExists = false;
    this.showBadge = false;
    this.registrationError = false;
    this.registrationErrorMessage = environment.registrationError_FormIssue;

    this.store.select(selectEmailTaken).subscribe((state) => {
      this.emailError = state;
    });
    this.store.select(selectRegisterErrorStatus).subscribe((state) => {
      this.registrationError = state;
      this.registrationErrorMessage = environment.registrationError_RequestIssue;
    });
  }

  ngOnInit(): void {
  }

  openUploadDialog() {
    this.dialog.open(UploadPictureDialogComponent, {
      width: environment.dialog_UploadPhoto_Settings.width,
      height: environment.dialog_UploadPhoto_Settings.height,
      enterAnimationDuration: environment.dialog_UploadPhoto_Settings.openAnimationDuration
    }).afterClosed().subscribe((result: File) => {
      if (result) {
        this.uploadedPicture = result;
        let imageTag: HTMLImageElement | null = (<HTMLElement>this.elRef.nativeElement).querySelector(".profile-picture");
        if(imageTag){
          imageTag.src = URL.createObjectURL(result);
          this.userPictureExists = true;
        }
      }
    });
  }

  deletePhoto() {
    if (this.uploadedPicture !== null) {
      this.uploadedPicture = null;
      let imageTag: HTMLImageElement | null = (<HTMLElement>this.elRef.nativeElement).querySelector(".profile-picture");
      if(imageTag){
        imageTag.src = this.defaultPicturePath as string;
        this.userPictureExists = false;
      }
    }
  }

  newDate(ev: MatDatepickerInputEvent<Date>) {
    let rawStringDate: string | undefined = ev.value?.toString();
    let rawStringDate_decomposed = rawStringDate?.split(" ", 4);
    if (rawStringDate_decomposed) {
      let _month: number;
      switch (rawStringDate_decomposed[1]) {
        case "Jan": {
          _month = 1;
          break;
        }
        case "Feb": {
          _month = 2;
          break;
        }
        case "Mar": {
          _month = 3;
          break;
        }
        case "Apr": {
          _month = 4;
          break;
        }
        case "May": {
          _month = 5;
          break;
        }
        case "Jun": {
          _month = 6;
          break;
        }
        case "Jul": {
          _month = 7;
          break;
        }
        case "Aug": {
          _month = 8;
          break;
        }
        case "Sep": {
          _month = 9;
          break;
        }
        case "Oct": {
          _month = 10;
          break;
        }
        case "Nov": {
          _month = 11;
          break;
        }
        case "Dec": {
          _month = 12;
          break;
        }
        default: {
          _month = 0;
          break;
        }
      }
      this.birthDate = {
        year: Number(rawStringDate_decomposed[3]),
        month: _month,
        day: Number(rawStringDate_decomposed[2])
      }
    }
  }

  checkEmail(e: Event){
    this.store.dispatch(checkEmail({mail: (<HTMLInputElement> e.target).value}));
  }

  checkData(): boolean {

    if (this.email === "" || this.password === "" || this.passwordRep === "" || this.password !== this.passwordRep || this.firstName === "" || this.lastName === "" || this.userGender === "" || this.phoneNumber === "" || this.phoneNumber.length < this.phoneNumberLength || this.birthDate === null) {
      return false;
    } else {
      return true;
    }
  }

  checkChar(ev: KeyboardEvent) {
    let asciiVal = ev.key.charCodeAt(0);
    if (asciiVal >= 48 && asciiVal <= 57) {
      return true;
    }
    return false;
  }

  registerNow() {
    if (this.checkData()) {
      this.registrationError = false;
      let userData: RegisterDto = {
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        birthDate: this.birthDate,
        gender: this.userGender,
        phoneNumber: this.phoneNumber,
        profilePicture: this.uploadedPicture,
      };
      this.store.dispatch(register({registerDto: userData}));
    } else {
      this.registrationError = true;
      this.registrationErrorMessage = environment.registrationError_FormIssue;
    }
  }


}

