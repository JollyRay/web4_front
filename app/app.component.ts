import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // add //localhost:8080 for run on localhost
  // empty for run on helios wildfly
  static API_URL = '';
  title = 'Lab4-Web';
}
