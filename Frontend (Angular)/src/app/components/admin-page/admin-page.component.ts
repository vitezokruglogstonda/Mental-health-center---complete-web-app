import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { of, switchMap, take } from 'rxjs';
import { UserListItem } from 'src/app/models/admin';
import { CustomDate, UserType } from 'src/app/models/user';
import { addNewUser, changeUsersPassword, deleteUser, loadUserList } from 'src/app/store/admin/admin.action';
import { selectAllUsers } from 'src/app/store/admin/admin.selector';
import { AppState } from 'src/app/store/app.state';
import { environment } from 'src/environments/environment';
import { ChangePasswordDialogComponent } from '../change-password-dialog/change-password-dialog.component';
import { UploadPictureDialogComponent } from '../upload-picture-dialog/upload-picture-dialog.component';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
  animations: [
    trigger("item-fade-out", [
      transition(":leave",
        animate(`${environment.operator_dashboard.request_list_animation_duration}s 0s ease`, style({
          opacity: 0,
          backgroundColor: 'white'
        }))
      )
    ])
  ]
})
export class AdminPageComponent implements OnInit {

  public pageTitle: String;
  public selectedTab: FormControl;
  public allUsersList: UserListItem[];
  public userList: UserListItem[];
  public listItems: boolean[];
  public userTypes: string[];
  public selectedUserType: string;
  public userSearchString: string;
  //2. tab
  public newUser_email: string;
  public newUser_password: string;
  public newUser_firstName: string;
  public newUser_lastName: string;
  public newUser_birthDate: CustomDate | null;
  public newUser_gender: string;
  public newUser_phoneNumber: string;
  public newUser_userType_string: string;
  public newUser_userType: UserType;
  //public newUser_profilePicturePath: string;
  public newUser_description: string;

  public emailError: boolean;
  public emailExample: String;
  public emailPattern: String;
  public emailErrorMessage_Invalid: String;
  public emailErrorMessage_Taken: String;
  public passwordErrorMessage: String;
  public passwordHint: String;
  public passwordHide: boolean;
  public phoneNumberLength: number;
  public gendersList: String[];
  public userTypeList: String[];
  public showDescriptionField: boolean;
  public defaultPicturePath: String;
  public uploadedPicture: File | null;
  public userPictureExists: boolean;
  public showBadge: boolean;
  public registrationError: boolean;
  public registrationErrorMessage: String;

  constructor(public dialog: MatDialog, private elRef: ElementRef, private store: Store<AppState>, private snackBar: MatSnackBar) {
    this.pageTitle = "";
    this.selectedTab = new FormControl(0);
    this.allUsersList = [];
    this.userList = [];
    this.listItems = [];
    this.userTypes = [];
    this.selectedUserType = "All";
    this.userSearchString = "";
    //2. tab
    this.newUser_email = "";
    this.newUser_password = "";
    this.newUser_firstName = "";
    this.newUser_lastName = "";
    this.newUser_birthDate = null;
    this.newUser_gender = "";
    this.newUser_phoneNumber = "";
    this.newUser_userType_string = "";
    this.newUser_userType = UserType.Guest;
    //this.newUser_profilePicturePath = "";
    this.newUser_description = "";

    this.emailError = false;
    this.emailExample = environment.login_card_example_email;
    this.emailPattern = environment.email_pattern;
    this.emailErrorMessage_Invalid = environment.email_errorMessage_Invalid;
    this.emailErrorMessage_Taken = environment.email_errorMessage_Taken;
    this.passwordErrorMessage = environment.password_errorMessage;
    this.passwordHint = environment.password_hint;
    this.passwordHide = true;
    this.phoneNumberLength = environment.seek_help.phone_number_length;
    this.gendersList = environment.gender_list;
    this.userTypeList = ["Patient", "Therapist", "CallOperator"];
    this.showDescriptionField = false;
    this.defaultPicturePath = environment.account_icon_basic_URL;
    this.uploadedPicture = null;
    this.userPictureExists = false;
    this.showBadge = false;
    this.registrationError = false;
    this.registrationErrorMessage = environment.registrationError_FormIssue;
  }

  ngOnInit(): void {
    this.pageTitle = environment.admin_page.title;
    this.userTypes.push("All");
    Object.keys(UserType).filter((v) => isNaN(Number(v))).forEach(type => {
      if (type !== "Guest" && type !== "Admin")
        this.userTypes.push(type);
    });
    this.store.dispatch(loadUserList());
    this.store.select(selectAllUsers).subscribe((state) => {
      this.allUsersList.splice(0, this.allUsersList.length);
      this.userList.splice(0, this.userList.length);
      this.listItems.splice(0, this.listItems.length);
      state.forEach(el => {
        if (el) {
          this.allUsersList.push(el);
          this.userList.push(el);
          this.listItems.push(true);
        }
      })
      let footer = document.querySelector(".footer1");
      if (this.allUsersList.length > 3) {
        footer?.classList.add("footer2");
      } else {
        footer?.classList.remove("footer2");
      }
    });
  }

  typeChange() {
    //console.log(this.selectedUserType)
    this.userList.splice(0, this.userList.length);
    if (this.selectedUserType === "All") {
      this.allUsersList.forEach(el => this.userList.push(el))
    } else {
      this.allUsersList.filter(el => UserType[el.userType] === this.selectedUserType).forEach(el => this.userList.push(el))
    }
  }

  findUser() {
    if (this.userSearchString.length === 0) {
      // this.userList.splice(0, this.userList.length);
      // this.allUsersList.forEach(el => this.userList.push(el))
      this.typeChange();
    } else {
      //isfiltriraj sta vec postoji u this.userList
      this.userList = this.userList.filter(user =>
        user.firstName.toLowerCase().includes(this.userSearchString.toLowerCase()) || user.lastName.toLowerCase().includes(this.userSearchString.toLowerCase())
      )
    }
  }

  tabChange(index: number) {
    // this.selectedTab.setValue(index);
    // let footer = document.querySelector(".footer1");
    // if(index === 0){
    //   footer?.classList.remove("footer2");
    // }else if(index === 1){
    //   footer?.classList.add("footer2");
    // }
  }

  openChangePasswordDialog(id: number | null) {
    if (id) {
      this.dialog.open(ChangePasswordDialogComponent, {
        width: environment.dialog_ChangePassword_Settings.width,
        height: environment.dialog_ChangePassword_Settings.height,
        enterAnimationDuration: environment.dialog_ChangePassword_Settings.openAnimationDuration
      }).afterClosed().subscribe((result: String) => {
        if (result.length > 0) {
          this.store.dispatch(changeUsersPassword({ userId: id as number, password: result }));
          //ukoliko neces refresh cele liste, manuelno promeni password property kod usera, i u reduceru ne update-uj entity
          let tmpUser: UserListItem | undefined = this.userList.find(el => el.id === id)
          let horizontalPosition: MatSnackBarHorizontalPosition = environment.seek_help.snackbar_horisontal_position as MatSnackBarHorizontalPosition;
          let verticalPosition: MatSnackBarVerticalPosition = environment.seek_help.snackbar_vertical_position as MatSnackBarVerticalPosition;
          this.snackBar.open(`${tmpUser?.firstName} ${tmpUser?.lastName}${environment.admin_page.snackbar.change_password}`, environment.seek_help.snackbar_button_text, {
            horizontalPosition: horizontalPosition,
            verticalPosition: verticalPosition,
          });
        }
      });
    }
  }

  calculateAge(birthDate: CustomDate): String {
    let patientAge: number = 0;
    let currentDate: Date = new Date();
    let splitedDate: String[] = currentDate.toLocaleDateString().split("/");
    patientAge = Number(splitedDate[2]) - birthDate.year;
    if (Number(splitedDate[0]) < birthDate.month || (Number(splitedDate[0]) === birthDate.month && Number(splitedDate[1]) < birthDate.day)) {
      patientAge--;
    }
    if (patientAge < 0)
      patientAge = 0;
    return patientAge.toString();
  }

  findUserById(id: number): UserListItem {
    // return this.store.select(selectAllUsers).pipe(
    //   switchMap((users)=>{
    //     return of(users.find(el => el?.id === id))
    //   })
    // );
    return this.allUsersList.find(el => el?.id === id) as UserListItem;
  }
  getUserType(i: number): string {
    return UserType[i];
  }

  deleteUser(ev: Event) {
    let button = ((ev.target as HTMLElement).parentElement?.parentElement as HTMLButtonElement)
    let userId = button.value;
    let userId_int: number = Number(userId);
    let listItemElement = button.parentElement?.parentElement?.parentElement?.parentElement;
    listItemElement?.classList.add("request-item-finished");
    this.listItems[this.allUsersList.indexOf(this.allUsersList.find((el) => el?.id === userId_int) as UserListItem)] = false;

    setTimeout(() => this.store.dispatch(deleteUser({ userId: userId_int })), environment.operator_dashboard.request_list_animation_duration * 1000); //zbog animacije
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
      this.newUser_birthDate = {
        year: Number(rawStringDate_decomposed[3]),
        month: _month,
        day: Number(rawStringDate_decomposed[2])
      }
    }
  }

  checkChar(ev: KeyboardEvent) {
    let asciiVal = ev.key.charCodeAt(0);
    if (asciiVal >= 48 && asciiVal <= 57) {
      return true;
    }
    return false;
  }

  checkEmail(e: Event) {
    let mail: string = (<HTMLInputElement>e.target).value;
    if (this.allUsersList.find(user => user.email === mail)) {
      this.emailError = true;
    } else {
      this.emailError = false;
    }
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
        if (imageTag) {
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
      if (imageTag) {
        imageTag.src = this.defaultPicturePath as string;
        this.userPictureExists = false;
      }
    }
  }

  checkData(): boolean {
    if (this.newUser_userType !== UserType.Therapist) {
      this.newUser_description = "";
    }
    if (this.newUser_email === "" || this.newUser_password === "" || this.newUser_firstName === "" || this.newUser_lastName === "" || this.newUser_gender === "" || this.newUser_phoneNumber === "" || this.newUser_phoneNumber.length < this.phoneNumberLength || this.newUser_birthDate === null || this.newUser_userType === UserType.Guest) {
      return false;
    } else {
      return true;
    }
  }

  newUserTypeChange() {
    this.newUser_userType = (<any>UserType)[this.newUser_userType_string];
    if (this.newUser_userType === UserType.Therapist) {
      this.showDescriptionField = true;
    } else {
      this.showDescriptionField = false;
    }
  }

  addNewUser() {
    if (this.checkData()) {
      this.registrationError = false;
      let userData: UserListItem = {
        id: null,
        email: this.newUser_email,
        password: this.newUser_password,
        firstName: this.newUser_firstName,
        lastName: this.newUser_lastName,
        birthDate: this.newUser_birthDate as CustomDate,
        gender: this.newUser_gender,
        userType: this.newUser_userType,
        phoneNumber: this.newUser_phoneNumber,
        //profilePicturePath: this.uploadedPicture,
        profilePicturePath: this.defaultPicturePath,
        therapistID: null,
        description: this.newUser_description,
        numberOfPatients: null
      };
      this.store.dispatch(addNewUser({ data: userData, picture: this.uploadedPicture }));
      let horizontalPosition: MatSnackBarHorizontalPosition = environment.seek_help.snackbar_horisontal_position as MatSnackBarHorizontalPosition;
      let verticalPosition: MatSnackBarVerticalPosition = environment.seek_help.snackbar_vertical_position as MatSnackBarVerticalPosition;
      this.snackBar.open(`${this.getUserType(this.newUser_userType)} ${environment.admin_page.snackbar.add_user}`, environment.seek_help.snackbar_button_text, {
        horizontalPosition: horizontalPosition,
        verticalPosition: verticalPosition,
      });
      //vrati stare vrednosti (nova funkcija, poziva se i u konstruktoru)
      this.resetValues();
    } else {
      this.registrationError = true;
      this.registrationErrorMessage = environment.registrationError_FormIssue;
    }
  }

  resetValues() {
    this.newUser_email = "";
    this.newUser_password = "";
    this.newUser_firstName = "";
    this.newUser_lastName = "";
    this.newUser_birthDate = null;
    this.newUser_gender = "";
    this.newUser_phoneNumber = "";
    this.newUser_userType_string = "";
    this.newUser_userType = UserType.Guest;
    //this.newUser_profilePicturePath = "";
    this.newUser_description = "";

    this.emailError = false;
    this.emailExample = environment.login_card_example_email;
    this.emailPattern = environment.email_pattern;
    this.emailErrorMessage_Invalid = environment.email_errorMessage_Invalid;
    this.emailErrorMessage_Taken = environment.email_errorMessage_Taken;
    this.passwordErrorMessage = environment.password_errorMessage;
    this.passwordHint = environment.password_hint;
    this.passwordHide = true;
    this.phoneNumberLength = environment.seek_help.phone_number_length;
    this.gendersList = environment.gender_list;
    this.userTypeList = ["Patient", "Therapist", "CallOperator"];
    this.showDescriptionField = false;
    this.defaultPicturePath = environment.account_icon_basic_URL;
    this.uploadedPicture = null;
    this.userPictureExists = false;
    this.showBadge = false;
    this.registrationError = false;
    this.registrationErrorMessage = environment.registrationError_FormIssue;
  }

}
