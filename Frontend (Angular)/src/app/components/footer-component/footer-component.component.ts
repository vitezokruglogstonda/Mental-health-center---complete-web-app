import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer-component',
  templateUrl: './footer-component.component.html',
  styleUrls: ['./footer-component.component.scss']
})
export class FooterComponentComponent implements OnInit {

  public footerText: String;

  constructor() { 
    this.footerText = environment.footer_text;
  }

  ngOnInit(): void {
  }

}
