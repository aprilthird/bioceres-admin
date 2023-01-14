import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        loadChildren: () => 
          import("./modules/auth/auth.module").then((m) => m.AuthModule),
      },
      {
        path: '',
        loadChildren: () =>
          import("./modules/main/main.module").then((m) => m.MainModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
