import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent {

  constructor(private _router: Router) { }
  
  onRecover(): void {
    this._router.navigateByUrl('/login');
  }
}
