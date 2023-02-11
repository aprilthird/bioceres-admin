import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UsersComponent } from './components/users/users.component';
import { MainComponent } from './main.component';
import { AssembliesComponent} from "./components/assemblies/assemblies.component";
import { AssemblyFormComponent} from "./components/assembly-form/assembly-form.component";
import { BiddingsComponent} from "./components/biddings/biddings.component";
import { BiddingFormComponent} from "./components/bidding-form/bidding-form.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'users', component: UsersComponent },
      { path: 'users/new', component: UserFormComponent },
      { path: 'users/edit/:id', component: UserFormComponent },
      { path: 'assemblies', component: AssembliesComponent },
      { path: 'assemblies/new', component: AssemblyFormComponent },
      { path: 'assemblies/edit/:id', component: AssemblyFormComponent },
      { path: 'biddings', component: BiddingsComponent },
      { path: 'biddings/new', component: BiddingFormComponent },
      { path: 'biddings/edit/:id', component: BiddingFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
