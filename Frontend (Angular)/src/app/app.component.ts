import { Component, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import { selectSidenavInfo } from './store/sidenav/sidenav.selector';
import { CardType, LoginStatus } from './models/app-info';
import { NavigationEnd, Router } from '@angular/router';
import { selectLoginStatus } from './store/app/app.selector';
import { SidenavListItem } from './models/sidenav-info';
import { loadItemsOffline } from './store/sidenav/sidenav.action';
import { Subject } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { HomePageComponent } from './components/home-page/home-page.component';
import { UserType } from './models/user';
import { selectUserType } from './store/user/user.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = environment.app_title;
  public toolbarCenterText = environment.toolbar_center_text;
  public menuButtonTooltipText = environment.toolbar_menu_button_tooltip_text;
  public showDelay = new FormControl(environment.toolbar_menu_button_tooltip_show_delay);
  public allSidenavItems: (SidenavListItem | undefined)[];
  public sidenavItems: (SidenavListItem | undefined)[];
  public showCard_LogIn: boolean = false;
  public showCard_AccountInfo: boolean = false;
  public onlineStatus: LoginStatus;
  public userType: UserType;
  public cardTriggeredEvent: Subject<number>;

  constructor(private store: Store<AppState>, private router: Router) {
    this.allSidenavItems = [];
    this.sidenavItems = [];
    this.onlineStatus = LoginStatus.Offline;
    this.cardTriggeredEvent = new Subject<number>();
    this.userType = UserType.Guest;
  }

  ngOnInit(): void {
    this.store.dispatch(loadItemsOffline());

    this.store.select(selectSidenavInfo).subscribe((state) => {
      state.forEach((el: SidenavListItem | undefined) => {
        //this.sidenavItems.push(el);
        //ovo dole je novo
        this.allSidenavItems.push(el);
        if (el?.permissions.includes(this.userType)) {
          this.sidenavItems.push(el);
        }
      })
    });

    this.store.select(selectLoginStatus).subscribe((state) => {
      if (this.onlineStatus !== state) {
        this.onlineStatus = state;
        this.sidenavItems.splice(0, this.sidenavItems.length);
        if (this.onlineStatus === LoginStatus.Offline) {
          this.userType = UserType.Guest;
          this.allSidenavItems.forEach(el => {
            if (el?.permissions.includes(this.userType)) {
              this.sidenavItems.push(el);
            }
          })
        } else {
          this.store.select(selectUserType).subscribe(state => {
            this.userType = state;
            this.allSidenavItems.forEach(el => {
              if (el?.permissions.includes(this.userType)) {
                this.sidenavItems.push(el);
              }
            })
          }).unsubscribe();
        }
        this.router.navigate([""]);
      }
    });

    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        let page_route: string = ev.url.split('/', 2)[1];
        if (!this.allSidenavItems.find(el => (el as SidenavListItem).route as string == page_route)?.permissions.includes(this.userType)) {
          this.router.navigate([""]);
        }
      }
    })
    
  }

  updateCardComponent(ev: [boolean, CardType]) {
    if (!ev[0]) {
      this.showCard_LogIn = false;
      this.showCard_AccountInfo = false;
    }
    else if (ev[1] === CardType.LogIn) {
      this.showCard_LogIn = true;
      this.showCard_AccountInfo = false;
    }
    else {
      this.showCard_LogIn = false;
      this.showCard_AccountInfo = true;
    }
  }

  cardTriggeredHide() {
    this.cardTriggeredEvent.next(1);
  }

  subscribeToChildEmmiter(childRef: HomePageComponent) {
    if (childRef.scrollEmitter) {
      childRef.scrollEmitter.subscribe((topOfPage: boolean) => {
        const toolbar = document.querySelector(".main-toolbar");
        if (topOfPage) {
          toolbar?.classList.add("main-toolbar-transparent");
        } else {
          toolbar?.classList.remove("main-toolbar-transparent");
        }
      });
    }
  }

  unsubscribe() {
    const toolbar = document.querySelector(".main-toolbar");
    toolbar?.classList.remove("main-toolbar-transparent");
  }

}
