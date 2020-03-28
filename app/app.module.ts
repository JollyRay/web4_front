import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {FormsModule} from '@angular/forms';
import {AuthService} from './services/auth.service';
import {HttpClientModule} from '@angular/common/http';
import {AccountService} from './services/account.service';
import {HomeComponent} from './components/home/home.component';
import {routing} from './app.routing';
import {HistoryComponent} from './components/history/history.component';
import {CheckPointComponent} from './components/check-point/check-point.component';
import {PointsService} from './services/points.service';
import {HttpModule} from '@angular/http';
import {HeaderComponent} from './components/header/header.component';
import {CheckboxModule} from 'primeng/checkbox';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {AuthGuard} from './urlPermission/auth.guard';
import {NotAuthGuard} from './urlPermission/not-auth.guard';
import {UserService} from './services/user.service';
import {SliderModule} from 'primeng';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HistoryComponent,
    CheckPointComponent,
    HeaderComponent
  ],
    imports: [
        BrowserModule, HttpClientModule, HttpModule, FormsModule, routing, CheckboxModule, ButtonModule, TableModule, SliderModule,
    ],
  providers: [AuthService, AccountService, AuthGuard, NotAuthGuard, PointsService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
