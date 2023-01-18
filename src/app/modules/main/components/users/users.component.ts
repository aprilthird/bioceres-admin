import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UsersService } from 'src/app/services/users/users.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Constants } from 'src/app/helpers/constants';

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

  constructor(private router: Router, private userService: UsersService, private toastr: ToastrService) {
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
      },
      error: (error) => {
        this.toastr.error('Error al intentar obtener los usuarios.', 'Error');
      }
    });
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
          this.toastr.success('Se eliminó al usuario con éxito.', 'Exito');
        },
        error: (error) => {
          this.toastr.error('Error al intentar eliminar al usuario.', 'Error');
        }
      });
    } else {
      this.toastr.error('Error al intentar eliminar al usuario.', 'Error');
    }
  }

  blankPasswordUser(user: User): void {
    if(user.id != null) {
      user.password = Constants.defaultPassword;
      this.userService.put(user).subscribe({
        next: (data) => {
          this.toastr.success('Se blanqueó la contraseña del usuario con éxito.', 'Exito');
        },
        error: (error) => {
          this.toastr.error('Error al intentar blanquear la contraseña del usuario.', 'Error');
        }
      });
    } else {
      this.toastr.error('Error al intentar blanquear la contraseña del usuario.', 'Error');
    }
  }
}





