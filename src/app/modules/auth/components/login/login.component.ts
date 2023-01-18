import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user: User;

  constructor(private router: Router, private authService: AuthService, private toastr: ToastrService) {
    this.user = new User();
  }

  redirectToRecoverPassword(): void {
    this.router.navigateByUrl('/auth/recover-password');
  }

  login(): void {
    this.authService.login(this.user).subscribe({
      next: (data) => {
        if (data != null) {
          if (data[0] != null) {
            localStorage.setItem('user', JSON.stringify(data[0]));
            this.toastr.success('Login exitoso', 'Exito');
            this.router.navigateByUrl('/home');
          } else {
            this.toastr.error('Login fallido', 'Error');
          }
        } else {
          this.toastr.error('Login fallido', 'Error');
        }
      },
      error: (error) => {
        this.toastr.error('Login fallido', 'Error');
      }
    });
  }
}
