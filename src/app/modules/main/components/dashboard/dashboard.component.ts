import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: User;

  constructor(private _router: Router) {
    this.user = new User();
  }

  ngOnInit(): void {
    let storedUser = localStorage.getItem("user");
    console.log(storedUser);
    if(storedUser == null) {
      this._router.navigateByUrl('/login');
    } else {
      this.user = JSON.parse(storedUser);
    }
  }

  onLogoff() : void {
    localStorage.removeItem("user");
    this._router.navigateByUrl('/login');
  }
}
