import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
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
  userForm: FormGroup;
  private sub: any;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UsersService, private toastr: ToastrService, private translateService: TranslateService) {
    this.formTitle = 'Crear Usuario';
    this.user = new User();
    this.id = 0;
  }

  ngOnInit(): void {
    this.loadForm();
    this.loadSubscriber();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  loadForm(): void {
    this.userForm = new FormGroup({
      username: new FormControl(this.user.username, [Validators.required]),
    })
  }

  loadSubscriber(): void {
    this.sub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = +params['id'];
        let userToEdit = localStorage.getItem('edit_user');
        if (userToEdit != null) {
          this.user = JSON.parse(userToEdit);
          this.formTitle = 'Editar Usuario';
        } else {
          this.translateService.get('notification.header.error').subscribe(headerStr => {
            this.translateService.get('notification.message.error.user_info_load').subscribe(messageStr => {
              this.toastr.error(messageStr, headerStr);
              this.router.navigateByUrl('users');
            });              
          });
        }
      }
    });
  }

  redirectToUsers(): void {
    this.router.navigateByUrl('users');
  }

  saveUser(): void {
    if(this.id == 0) {
      this.userService.post(this.user).subscribe({
        next: (data) => {
          if (data != null) {
            this.translateService.get('notification.header.success').subscribe(headerStr => {
              this.translateService.get('notification.message.success.user_creation').subscribe(messageStr => {
                this.toastr.success(messageStr, headerStr);
                this.router.navigateByUrl('users');
              });              
            });
          } else {
            this.translateService.get('notification.header.error').subscribe(headerStr => {
              this.translateService.get('notification.message.error.user_creation').subscribe(messageStr => {
                this.toastr.error(messageStr, headerStr);
              });              
            });
          }
        },
        error: (error) => {
          this.translateService.get('notification.header.error').subscribe(headerStr => {
            this.translateService.get('notification.message.error.user_creation').subscribe(messageStr => {
              this.toastr.error(messageStr, headerStr);
            });              
          });
        }
      });
    } else {
      this.userService.put(this.user).subscribe({
        next: (data) => {
          if (data != null) {
            this.translateService.get('notification.header.success').subscribe(headerStr => {
              this.translateService.get('notification.message.success.user_edit').subscribe(messageStr => {
                this.toastr.success(messageStr, headerStr);
                this.router.navigateByUrl('users');
              });              
            });
          } else {
            this.translateService.get('notification.header.error').subscribe(headerStr => {
              this.translateService.get('notification.message.error.user_edit').subscribe(messageStr => {
                this.toastr.error(messageStr, headerStr);
              });              
            });
          }
        },
        error: (error) => {
          this.translateService.get('notification.header.error').subscribe(headerStr => {
            this.translateService.get('notification.message.error.user_edit').subscribe(messageStr => {
              this.toastr.error(messageStr, headerStr);
            });              
          });
        }
      });
    }
  }
}
