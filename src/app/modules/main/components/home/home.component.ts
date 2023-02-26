import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  redirectToAssemblies(): void {
    this.router.navigateByUrl('/assemblies');
  }

  redirectToBiddings(): void {
    this.router.navigateByUrl('/biddings');
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigateByUrl('/auth/login');
  }
}
