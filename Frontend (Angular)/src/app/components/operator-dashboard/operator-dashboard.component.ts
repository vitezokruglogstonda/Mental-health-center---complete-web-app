import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { withLatestFrom } from 'rxjs';
import { HelpCallListItem } from 'src/app/models/help-call-dto';
import { AppState } from 'src/app/store/app.state';
import { finishRequest, loadHelpCallsRequests } from 'src/app/store/operator-dashboard/operator-dashboard.action';
import { selectHelpCallRequests } from 'src/app/store/operator-dashboard/operator-dashboard.selector';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-operator-dashboard',
  templateUrl: './operator-dashboard.component.html',
  styleUrls: ['./operator-dashboard.component.scss'],
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
export class OperatorDashboardComponent implements OnInit {

  public helpCalls: (HelpCallListItem | undefined)[]; 
  public listItems: boolean[];

  constructor(private store: Store<AppState>) {
    this.helpCalls = [];
    this.listItems = [];
  }

  ngOnInit(): void {
    this.store.dispatch(loadHelpCallsRequests());

    this.store.select(selectHelpCallRequests).subscribe((state) => {
      this.helpCalls.splice(0, this.helpCalls.length);
      this.listItems.splice(0, this.listItems.length);
      state.forEach((el: HelpCallListItem | undefined) => {
        this.helpCalls.push(el);
        this.listItems.push(true);
      })
      let footer = document.querySelector(".footer1");
      if (this.helpCalls.length > 3) {
        footer?.classList.add("footer2");
      }else{
        footer?.classList.remove("footer2");
      }
    });
  }

  callDone(ev: Event){
    let button = ((ev.target as HTMLElement).parentElement?.parentElement as HTMLButtonElement)
    let requestId = Number(button.value);
    let listItemElement = button.parentElement?.parentElement?.parentElement?.parentElement;
    listItemElement?.classList.add("request-item-finished");
    this.listItems[this.helpCalls.indexOf(this.helpCalls.find((el) => el?.id === requestId))] = false;    

    setTimeout(() => this.store.dispatch(finishRequest({requestId})), environment.operator_dashboard.request_list_animation_duration * 1000); //zbog animacije
    //this.store.dispatch(finishRequest({requestId}))
  }

}
