import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CardType } from 'src/app/models/app-info';
import { selectEmailExample, selectLoginErrorStatus } from 'src/app/store/app/app.selector';
import { AppState } from 'src/app/store/app.state';
import { environment } from 'src/environments/environment';
import { logIn } from 'src/app/store/user/user.action';
import { LoginDto } from 'src/app/models/user';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss']
})
export class LoginCardComponent implements OnInit {
  
  //public emailControl = new FormControl('', [Validators.required, Validators.email]);
  public email: String;
  public emailExample: String;
  public emailError: boolean;
  public password: String;
  public passwordHide: boolean;
  public passwordError: boolean;
  public fieldError: String;
  public loginError: boolean;
  @Output() loginCardEmitter: EventEmitter<boolean>;

  constructor(private store: Store<AppState>, private elRef: ElementRef) { 
    this.email = "";
    this.emailExample = "";
    this.emailError = false;
    this.password = "";
    this.passwordHide = true;
    this.passwordError = false;
    this.fieldError = environment.login_card_fieldError;
    this.loginError = false;
    this.loginCardEmitter = new EventEmitter<boolean>();
  }

  ngOnInit(): void {
    this.store.select(selectEmailExample).subscribe((state) => {
      this.emailExample = state;
    });
    this.store.select(selectLoginErrorStatus).subscribe((state)=>{
      this.loginError = state;
    });
  }

  // getErrorMessage() {
  //   if (this.emailField.hasError('required')) {
  //     return 'You must enter a value';
  //   }

  //   return this.emailField.hasError('email') ? 'Not a valid email' : '';
  // }

  checkEmail(){
    if(this.email.length === 0){
      this.emailError=true;
    }else{
      this.emailError=false;
    }
  }

  checkPassword(){
    if(this.password.length === 0){
      this.passwordError=true;
    }else{
      this.passwordError=false;
    }
  }

  logIn(){
    if(!(this.email.length===0) && !(this.password.length===0)){
      const dto: LoginDto = {
        email: this.email,
        password: this.password
      };      
      this.store.dispatch(logIn({loginDto: dto}));
      //on 2 puta poziva akciju, zato izlazi error
    }
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