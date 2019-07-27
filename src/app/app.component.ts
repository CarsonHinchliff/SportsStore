import { Component } from '@angular/core';

@Component({
  selector: 'root',
  // templateUrl: './app.component.html',
  // template: `<store></store>`,
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
