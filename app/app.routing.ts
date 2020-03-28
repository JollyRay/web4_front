import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {HomeComponent} from "./components/home/home.component";
import {AuthGuard} from "./urlPermission/auth.guard";
import {NotAuthGuard} from "./urlPermission/not-auth.guard";


const appRoutes: Routes = [

  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'check-point', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'history', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent, canActivate: [NotAuthGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [NotAuthGuard]},

  // otherwise redirect to profile
  {path: '**', redirectTo: '/home'}
];

export const routing = RouterModule.forRoot(appRoutes);
