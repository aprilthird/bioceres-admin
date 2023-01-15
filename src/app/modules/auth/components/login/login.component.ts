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
    this.router.navigateByUrl('/recover-password');
  }
  
  onLogin(): void {
    console.log(this.user);
    this.authService.login(this.user).subscribe(data => {
      console.log(data);
      this.toastr.success('Exito', 'Prueba');
      // let loggedUser = data as Array<User>;
      // if(loggedUser == null) {
      //   this.toastr.error('Error', 'Usuario no existe');
      // } else {
      //   this.toastr.success('Exito', 'Login válido');
      //   localStorage.setItem("user", JSON.stringify(loggedUser));
      //   this.router.navigateByUrl('/dashboard');
      // }
    });
  }
}
