import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnDestroy {
  formTitle: String;
  user: User;
  id: Number;
  private sub: any;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UsersService, private toastr: ToastrService) {
    this.formTitle = 'Crear Usuario';
    this.user = new User();
    this.id = 0;
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = +params['id'];
        let userToEdit = localStorage.getItem('edit_user');
        if (userToEdit != null) {
          this.user = JSON.parse(userToEdit);
          this.formTitle = 'Editar Usuario';
        } else {
          this.toastr.error('Ocurrió un error cargando el usuario.', 'Error');
          this.router.navigateByUrl('users');
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  redirectToUsers(): void {
    this.router.navigateByUrl('users');
  }

  saveUser(): void {
    if(this.id == 0) {
      this.userService.post(this.user).subscribe({
        next: (data) => {
          if (data != null) {
            this.toastr.success('Registro válido', 'Exito');
            this.router.navigateByUrl('users');
          } else {
            this.toastr.error('Registro fallido', 'Error');
          }
        },
        error: (error) => {
          this.toastr.error('Registro fallido', 'Error');
        }
      });
    } else {
      this.userService.put(this.user).subscribe({
        next: (data) => {
          if (data != null) {
            this.toastr.success('Edición válida', 'Exito');
            this.router.navigateByUrl('users');
          } else {
            this.toastr.error('Edición fallida', 'Error');
          }
        },
        error: (error) => {
          this.toastr.error('Edición fallida', 'Error');
        }
      });
    }
  }
}
