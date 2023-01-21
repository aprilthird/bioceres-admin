import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UsersService } from 'src/app/services/users/users.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Constants } from 'src/app/helpers/constants';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements AfterViewInit {
  users: Array<User>;
  dataSource: MatTableDataSource<User>;
  query: String;
  displayedColumns: string[];
  @ViewChild(MatPaginator) paginator: any = MatPaginator;

  constructor(private router: Router, private userService: UsersService, private toastr: ToastrService, private translateService: TranslateService) {
    this.users = [];
    this.dataSource = new MatTableDataSource<User>(this.users); 
    this.query = '';
    this.displayedColumns = ['username', 'company', 'dni', 'cuit', 'role', 'email', 'phone', 'birthdate', 'birthlocation', 'actions'];
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getUsers();
  }

  filter(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getAll(this.query).subscribe({
      next: (data) => {
        this.users = data;
        this.dataSource.data = this.users;
        console.log(Date.parse(this.users[0].birthdate as string).toString())
      },
      error: (error) => {
        this.translateService.get('notification.header.error').subscribe(headerStr => {
          this.translateService.get('notification.message.error.user_load').subscribe(messageStr => {
            this.toastr.error(messageStr, headerStr);
          });              
        });
      }
    });
  }

  parsedBirthDateString(birthDate: String): String {
    var date = new Date(birthDate as string);
    return date.toLocaleDateString();
  }

  redirectToUserForm(user: User = new User()): void {
    if(user.id != null) {
      localStorage.setItem('edit_user', JSON.stringify(user));
      this.router.navigateByUrl('users/edit/' + user.id);
    } else {
      this.router.navigateByUrl('users/new');
    }
  }

  deleteUser(user: User): void {
    if(user.id != null) {
      this.userService.delete(user.id).subscribe({
        next: (data) => {
          this.getUsers();
          this.translateService.get('notification.header.success').subscribe(headerStr => {
            this.translateService.get('notification.message.success.user_deletion').subscribe(messageStr => {
              this.toastr.success(messageStr, headerStr);
            });              
          });
        },
        error: (error) => {
          this.translateService.get('notification.header.error').subscribe(headerStr => {
            this.translateService.get('notification.message.error.user_deletion').subscribe(messageStr => {
              this.toastr.error(messageStr, headerStr);
            });              
          });
        }
      });
    } else {
      this.translateService.get('notification.header.error').subscribe(headerStr => {
        this.translateService.get('notification.message.error.user_deletion').subscribe(messageStr => {
          this.toastr.error(messageStr, headerStr);
        });              
      });
    }
  }

  blankPasswordUser(user: User): void {
    if(user.id != null) {
      user.password = Constants.defaultPassword;
      this.userService.put(user).subscribe({
        next: (data) => {
          this.translateService.get('notification.header.success').subscribe(headerStr => {
            this.translateService.get('notification.message.success.password_bleaching').subscribe(messageStr => {
              this.toastr.success(messageStr, headerStr);
            });              
          });
        },
        error: (error) => {
          this.translateService.get('notification.header.error').subscribe(headerStr => {
            this.translateService.get('notification.message.error.password_bleaching').subscribe(messageStr => {
              this.toastr.error(messageStr, headerStr);
            });              
          });
        }
      });
    } else {
      this.translateService.get('notification.header.error').subscribe(headerStr => {
        this.translateService.get('notification.message.error.password_bleaching').subscribe(messageStr => {
          this.toastr.error(messageStr, headerStr);
        });              
      });
    }
  }
}





