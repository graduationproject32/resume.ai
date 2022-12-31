import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
//import authService
import { AuthService } from '../auth.service';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  default: string = 'CareerLevel';
  navType: string = 'lightNav';
  isLoading: boolean = false;
  faSpinner = faSpinner;
  public invalid: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}
  signupForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(20)],
    ],
    careerLevel: ['', Validators.required],
    userName: ['', Validators.required],
    position: ['', Validators.required],
  });
  onSubmit() {
    //use authService to signup
    this.isLoading = true;
    this.invalid = false;
    const res = this.authService.signup(
      this.signupForm.value.email!,
      this.signupForm.value.password!,
      this.signupForm.value.careerLevel!,
      this.signupForm.value.userName!,
      this.signupForm.value.position!
    );
    //access the code from the response
    res.then((res) => {
      this.isLoading = false;
      if (res.body?.code == 200) {
        this.invalid = false;
      } else {
        this.invalid = true;
      }
    });
    console.log(this.signupForm.value);
  }
}
