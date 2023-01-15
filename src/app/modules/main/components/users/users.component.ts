import {Component, OnInit} from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: Array<User>;
  query: String;

  constructor(private router: Router, private userService: UsersService, private toastr: ToastrService) {
    this.users = [];
    this.query = "";
  }

  displayedColumns: string[] = ['username','first_name','dni','cuit','role','email','phone','birthdate','birthlocation'];


  ngOnInit(): void {
    this.userService.getAll(this.query).subscribe(data => {
      this.users = data;
    });
  }
}





