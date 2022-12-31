import { Component } from '@angular/core';
import { Input } from '@angular/core';
//import authService
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input() navType: string = '';
  public isLoggedIn = false;
  userName = '';
  jobTitle = 'Junior Software Engineer';
  constructor(private authService: AuthService) {}
  ngOnInit() {
    console.log(localStorage.getItem('userData'));
    //check if user is logged in by checking local storage
    if (localStorage.getItem('userData') !== null) {
      const userData = JSON.parse(localStorage.getItem('userData') ?? '{}');
      this.userName = userData.email.split('@')[0];
      console.log('true');
      this.isLoggedIn = true;
    }
  }
  onLogout() {
    this.authService.logout();
  }
}
