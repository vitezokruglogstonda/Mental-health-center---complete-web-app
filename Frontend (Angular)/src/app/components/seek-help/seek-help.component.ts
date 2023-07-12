import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Form, FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { HelpCallStatus } from 'src/app/models/app-info';
import { AppState } from 'src/app/store/app.state';
import { helpCallRequest } from 'src/app/store/app/app.action';
import { selectHelpCallStatus } from 'src/app/store/app/app.selector';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-seek-help',
  templateUrl: './seek-help.component.html',
  styleUrls: ['./seek-help.component.scss']
})
export class SeekHelpComponent implements OnInit {

  public cardText: String;
  public guestName: FormControl;
  public guestNameErrorText: String;
  public guestPhoneNumber: FormControl;
  public guestPhoneNumberErrorText: String;
  public phoneNumberLength: number;
  @Output() emmiter: EventEmitter<boolean>;

  constructor(private store: Store<AppState>) {
    this.cardText = environment.seek_help.text;
    this.guestName = new FormControl('');
    this.guestNameErrorText = environment.seek_help.guest_name_error_text;
    this.guestPhoneNumber = new FormControl('');
    this.guestPhoneNumberErrorText = environment.seek_help.guest_phone_number_error_text_empty;
    this.phoneNumberLength = environment.seek_help.phone_number_length;
    this.emmiter = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
  }

  checkGuestName() {
    if (this.guestName.value?.length === 0) {
      this.guestName.markAsTouched();
    } else {
      this.guestName.markAsUntouched();
    }
  }

  checkChar(ev: KeyboardEvent) {
    let asciiVal = ev.key.charCodeAt(0);
    if (asciiVal >= 48 && asciiVal <= 57) {
      return true;
    }
    return false;
  }

  checkPhoneNumber() {
    if (this.guestPhoneNumber.value.length === 0) {
      this.guestPhoneNumberErrorText = environment.seek_help.guest_phone_number_error_text_empty;
      this.guestPhoneNumber.markAsDirty();
    } else if (this.guestPhoneNumber.value.length < this.phoneNumberLength) {
      this.guestPhoneNumberErrorText = environment.seek_help.guest_phone_number_error_text_incomplete;
      this.guestPhoneNumber.markAsDirty();
    } else {
      this.guestPhoneNumberErrorText = environment.seek_help.guest_phone_number_error_text_empty;
      this.guestPhoneNumber.markAsUntouched();
    }
  }

  submit() {
    if (this.guestName.value === "") {
      this.guestName.markAsTouched();
    }
    if (this.guestPhoneNumber.value === "") {
      this.guestPhoneNumberErrorText = environment.seek_help.guest_phone_number_error_text_empty;
      this.guestPhoneNumber.markAsTouched();
    } 
    if(this.guestName.value !== "" && this.guestPhoneNumber.value.length === this.phoneNumberLength) {
      if (this.guestName.value && this.guestPhoneNumber.value) {
        this.guestName.markAsUntouched();
        this.store.dispatch(helpCallRequest({
          request_name: this.guestName.value,
          request_number: this.guestPhoneNumber.value
        }));
        this.store.select(selectHelpCallStatus).subscribe((state) => {
          if (state === HelpCallStatus.Requested) {
            this.guestPhoneNumberErrorText = environment.seek_help.guest_phone_number_error_text_empty;
            this.guestPhoneNumber.setErrors({"incorrect": false})
            this.guestPhoneNumber.markAsUntouched();
            this.emmiter.emit(true);
          } else if (state === HelpCallStatus.Pending) {
            this.guestPhoneNumberErrorText = environment.seek_help.guest_phone_number_error_text_exists;
            this.guestPhoneNumber.markAsTouched();
            this.guestPhoneNumber.setErrors({"incorrect": true})
          }
        });
      }
    }
  }

}
