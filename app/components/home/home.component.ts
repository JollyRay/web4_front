import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {User} from '../../model/model.user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
// TODO: rename component profile -> home
export class HomeComponent implements OnInit {
  currentUser: User;
  section: string;

  constructor(public authService: AuthService, public router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.section = window.location.pathname.substr(1);
  }

// login out from the app
  logOut() {
    this.authService.logOut()
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {

        });
  }


  changeSection(section: string) {
    history.pushState(null, null, '/' + section);
    this.section = section;
  }
}
