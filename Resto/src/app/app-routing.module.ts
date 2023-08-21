import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/login/signup/signup.component';
import { RestaurentDashComponent } from './components/login/restaurent-dash/restaurent-dash.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'login',pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent 
  },
  {
    path: 'signup', component: SignupComponent 
  }, 
  {
    path:'restaurent' , component: RestaurentDashComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
