import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/helpers/constants';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isChecked: boolean;

  constructor() {
    this.isChecked = false;
  }

  ngOnInit(): void {
    this.isChecked = localStorage.getItem('lang') 
      == Constants.englishLocale;
  }

  changeLanguage(): void {
    localStorage.setItem('lang', (this.isChecked 
      ? Constants.englishLocale : Constants.spanishLocale) as string);
    window.location.reload();
  }
}
