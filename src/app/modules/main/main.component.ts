import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/helpers/constants';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  opened: boolean;
  isChecked: boolean;
  user: User;

  constructor(private router: Router) {
    this.opened = true;
    this.isChecked = false;
    this.user = new User();
  }

  ngOnInit(): void {
    this.isChecked = localStorage.getItem('lang') 
      == Constants.englishLocale;
    let storedUser = localStorage.getItem('user');
    if(storedUser == null) {
      this.router.navigateByUrl('/auth/login');
    } else {
      this.user = JSON.parse(storedUser);
    }
  }

  reloadApp(): void {
    // window.location.reload();
  }

  changeLanguage(): void {
    localStorage.setItem('lang', (this.isChecked 
      ? Constants.englishLocale : Constants.spanishLocale) as string);
    window.location.reload();
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigateByUrl('/auth/login');
  }
}
