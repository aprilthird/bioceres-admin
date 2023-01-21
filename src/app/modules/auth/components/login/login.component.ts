import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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

  constructor(private router: Router, private authService: AuthService, private toastr: ToastrService, private translateService: TranslateService) {
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
            this.translateService.get('notification.header.success').subscribe(headerStr => {
              this.translateService.get('notification.message.success.login').subscribe(messageStr => {
                this.toastr.success(messageStr, headerStr);
                this.router.navigateByUrl('/home');                
              });              
            });
          } else {
            this.translateService.get('notification.header.error').subscribe(headerStr => {
              this.translateService.get('notification.message.error.login').subscribe(messageStr => {
                this.toastr.error(messageStr, headerStr);    
              });              
            });
          }
        } else {
          this.translateService.get('notification.header.error').subscribe(headerStr => {
            this.translateService.get('notification.message.error.login').subscribe(messageStr => {
              this.toastr.error(messageStr, headerStr);    
            });              
          });
        }
      },
      error: (error) => {
        this.translateService.get('notification.header.error').subscribe(headerStr => {
          this.translateService.get('notification.message.error.login').subscribe(messageStr => {
            this.toastr.error(messageStr, headerStr);    
          });              
        });
      }
    });
  }
}
