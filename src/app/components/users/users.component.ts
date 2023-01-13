import {Component, OnInit} from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})



export class UsersComponent implements OnInit {

  users: Array<User>;

  constructor(private router: Router, private authService: AuthService, private toastr: ToastrService) {
    this.users = [];
  }

  displayedColumns: string[] = ['username'];

  ngOnInit(): void {
    this.authService.list().subscribe(data=>{
      let listusers = data as Array<User>;
      this.users = listusers;
      console.log(listusers);
    });
  }

}





