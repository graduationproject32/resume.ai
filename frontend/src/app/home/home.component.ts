import { Component } from '@angular/core';
import { faFont } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  navType: string = 'homeNav';
  faFont = faFont;
}
