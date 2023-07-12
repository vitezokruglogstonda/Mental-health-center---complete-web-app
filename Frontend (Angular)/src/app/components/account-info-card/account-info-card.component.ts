import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { UserType } from 'src/app/models/user';
import { AppState } from 'src/app/store/app.state';
import { loadTherapistsPatients, loadTherapistsSchedule } from 'src/app/store/therapist/therapist.action';
import { signOut } from 'src/app/store/user/user.action';
import { selectUserInfo } from 'src/app/store/user/user.selector';

@Component({
  selector: 'app-account-info-card',
  templateUrl: './account-info-card.component.html',
  styleUrls: ['./account-info-card.component.scss']
})
export class AccountInfoCardComponent implements OnInit {

  public accountImagePath: String;
  public userName: String;
  public email: String;
  @Output() loginCardEmitter: EventEmitter<boolean>;

  constructor(private store: Store<AppState>, private elRef: ElementRef) {
    this.accountImagePath = "";
    this.userName = "";
    this.email = "";
    this.loginCardEmitter = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
    this.store.select(selectUserInfo).subscribe((state) => {
      this.accountImagePath = state.profilePicturePath;
      this.userName = `${state.firstName} ${state.lastName}`;
      this.email = state.email;
      if(state.userType === UserType.Therapist){
        this.store.dispatch(loadTherapistsPatients({ therapistId: (state.id as number) }));
        this.store.dispatch(loadTherapistsSchedule({ therapistId: (state.id as number) }))
      }
    });
  }

  signOut(){
    this.store.select(selectUserInfo).pipe(take(1)).subscribe((state)=> {
      this.store.dispatch(signOut());
    }).unsubscribe();
    
    //bez online property-ja u objektu
    //ne obraca se serveru
    //akcija direktno triggeruje reducer koji brise obj iz store-a i menja stanje appInfo
      //(2 reducera ga hvataju)
  }

  @HostListener('document:click', ['$event'])
  hideCard(){
    let card: HTMLElement | null = (<HTMLElement>this.elRef.nativeElement).querySelector(".card-container");
    let icon: HTMLElement | null = (document).querySelector(".icon-container");
    if(event && card && icon){
      if(!card.contains(event.target as Node | null) && !icon.contains(event.target as Node | null)){
        this.loginCardEmitter.emit(true);
      }
    }
  }

}
