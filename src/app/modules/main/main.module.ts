import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { UsersComponent } from './components/users/users.component';
import { HomeComponent } from './components/home/home.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { UserFormComponent } from './components/user-form/user-form.component';
import { AssembliesComponent } from './components/assemblies/assemblies.component';
import { BiddingsComponent } from './components/biddings/biddings.component';
import { AssemblyFormComponent } from './components/assembly-form/assembly-form.component';
import { BiddingFormComponent } from './components/bidding-form/bidding-form.component';



@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    UsersComponent,
    UserFormComponent,
    AssembliesComponent,
    BiddingsComponent,
    AssemblyFormComponent,
    BiddingFormComponent,
  ],
  imports: [
    SharedModule,
    MainRoutingModule,
  ]
})
export class MainModule { }
