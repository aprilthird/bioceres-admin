import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private router: Router) {
  }

  redirectToUsers(): void {
    this.router.navigateByUrl('/users');
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigateByUrl('/auth/login');
  }
}
