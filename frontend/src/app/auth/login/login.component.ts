import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
//import authService
import { AuthService } from '../auth.service';
//import fa spinner icon
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  navType: string = 'lightNav';
  invalid: boolean = false;
  loading: boolean = false;
  faSpinner = faSpinner;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(20)],
    ],
  });

  onSubmit() {
    this.loading = true;
    this.invalid = false;
    //use authService to login
    const res = this.authService.login(
      this.loginForm.value.email!,
      this.loginForm.value.password!
    );
    res.then((res) => {
      this.loading = false;
      if (res.code == 200) {
        this.invalid = false;
      } else {
        this.invalid = true;
      }
    });
    console.log(this.loginForm.value);
  }
}
