import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {User} from "../../model/model.user";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  user: User=new User();
  errorMessage:string;
  constructor(private authService :AuthService, private router: Router) { }

  ngOnInit() {
  }

  login(){
    console.log('if there is no hehehe in the end login doesnt work');
    // this.authService.logIn(this.user).then(next => {
    //       console.log('hehehe');
    //       this.router.navigate(['/home']);
    //     },err=>{
    //   console.log(err);
    //   this.errorMessage="логин или пароль неверный";}
    //   );
    // console.log(localStorage);

    this.authService.logIn(this.user)
      .subscribe(
        data => {
          console.log('hehehe');
          localStorage.setItem('currentUser', JSON.stringify(this.user));
          localStorage.setItem('userHash', btoa(this.user.username + ':' + this.user.password));
          this.router.navigate(['/home']);
        },
        error => {
          console.log(error);
          this.errorMessage="логин или пароль неверный";
        }
      );
  }
}
