import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCalendar } from '@angular/material/datepicker';
import { Store } from '@ngrx/store';
import { TherapistsPatientListItem } from 'src/app/models/therapist';
import { CustomDate } from 'src/app/models/user';
import { AppState } from 'src/app/store/app.state';
import { loadTherapistsPatients, loadTherapistsSchedule, updateNote } from 'src/app/store/therapist/therapist.action';
import { selectTherapistsPatientList } from 'src/app/store/therapist/therapist.selector';
import { selectUserId } from 'src/app/store/user/user.selector';

@Component({
  selector: 'app-therapist',
  templateUrl: './therapist.component.html',
  styleUrls: ['./therapist.component.scss']
})
export class TherapistComponent implements OnInit {

  public therapistId: number | null;
  public patientList: (TherapistsPatientListItem | undefined)[];
  public selected = new FormControl(0);
  public selectedDate: Date | null;
  public upcomingScheduleDate: Date | null;
  public notes: String[];

  constructor(private store: Store<AppState>) {
    this.therapistId = null;
    this.patientList = [];
    this.selectedDate = new Date();
    this.upcomingScheduleDate = null;
    this.notes = [];

    this.store.select(selectUserId).subscribe((state) => {
      this.therapistId = state;
      //this.store.dispatch(loadTherapistsPatients({ therapistId: (this.therapistId as number) }));
      this.store.select(selectTherapistsPatientList).subscribe((state) => {
        this.patientList.splice(0, this.patientList.length);
        this.notes.splice(0, this.notes.length);
        state.forEach((el: TherapistsPatientListItem | undefined) => {
          this.patientList.push(el);
          this.notes.push(el?.note as String);
        })
        let footer = document.querySelector(".footer1");
        if (this.patientList.length > 1) {
          footer?.classList.add("footer2");
        } else {
          footer?.classList.remove("footer2");
        }
        //this.store.dispatch(loadTherapistsSchedule({ therapistId: (this.therapistId as number) }))
      });
      this.upcomingScheduleDate = this.getUpcomingSchaduleDate();
      this.selectedDate = this.upcomingScheduleDate;
    })
  }

  ngOnInit(): void {
    // this.store.select(selectUserId).subscribe((state) => {
    //   this.therapistId = state;
    //   this.store.dispatch(loadTherapistsPatients({ therapistId: (this.therapistId as number) }));
    //   this.store.select(selectTherapistsPatientList).subscribe((state) => {
    //     this.patientList.splice(0, this.patientList.length);
    //     this.notes.splice(0, this.notes.length);
    //     state.forEach((el: TherapistsPatientListItem | undefined) => {
    //       this.patientList.push(el);
    //       this.notes.push(el?.note as String);
    //     })
    //     let footer = document.querySelector(".footer1");
    //     if (this.patientList.length > 1) {
    //       footer?.classList.add("footer2");
    //     } else {
    //       footer?.classList.remove("footer2");
    //     }
    //     this.store.dispatch(loadTherapistsSchedule({ therapistId: (this.therapistId as number) }))
    //   });
    //   this.upcomingScheduleDate = this.getUpcomingSchaduleDate();
    //   this.selectedDate = this.upcomingScheduleDate;
    // })

  }

  getUpcomingSchaduleDate(): Date {
    let returnDate: Date = new Date();
    let dayIncrement;
    if (this.selectedDate) {
      let rawStringDate: string = this.selectedDate?.toString();
      let rawStringDate_decomposed: string[] = rawStringDate?.split(" ", 4);
      switch (rawStringDate_decomposed[0]) {
        case "Sat": {
          dayIncrement = 2;
          break;
        }
        case "Sun": {
          dayIncrement = 1;
          break;
        }
        default: {
          dayIncrement = 0;
          break;
        }
      }
    }
    returnDate.setDate(returnDate.getDate() + (dayIncrement as number));
    return returnDate;
  }

  filterCalendar = (d: Date): boolean => {
    let rawStringDate: string = d.toString();
    let rawStringDate_decomposed: string[] = rawStringDate?.split(" ", 4);
    let dayOfWeek: number;
    switch (rawStringDate_decomposed[0]) {
      case "Sat": {
        dayOfWeek = 6;
        break;
      }
      case "Sun": {
        dayOfWeek = 7;
        break;
      }
      default: {
        dayOfWeek = 0;
        break;
      }
    }
    if (dayOfWeek === 6 || dayOfWeek === 7)
      return false;
    return true;
  }

  tabChange(index: number) {
    this.selected.setValue(index);
    let footer = document.querySelector(".footer1");
    if (index === 0) {
      if(this.patientList.length < 3){
        footer?.classList.remove("footer2");
      }
    } else if (index === 1) {
      footer?.classList.add("footer2");
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

  noteUpdate(ev: Event) {
    let index: number = Number((event?.srcElement as HTMLElement).id);
    let patientId: number = Number(this.patientList[index]?.id);
    this.store.dispatch(updateNote({ patientId: patientId, note: this.notes[index] }));
  }


}
