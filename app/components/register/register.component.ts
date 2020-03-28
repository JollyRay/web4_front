import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {User} from "../../model/model.user";
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  errorMessage: string;

  constructor(public accountService: AccountService, public router: Router) {
  }

  ngOnInit() {
  }

  register() {
    console.log('so we try to register');
    this.accountService.createAccount(this.user).subscribe(data => {
      console.log('register success');
      this.router.navigate(['/login']);
        this.errorMessage = '';
      }, error => {
      if (error.status === 201)
        this.router.navigate(['/login']);

      console.log(error.status);
        this.errorMessage = "другой котик уже занял это кодовое имя";
      }
    )
  }
}
