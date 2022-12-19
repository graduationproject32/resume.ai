import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  constructor(private formBuilder: FormBuilder) { }
  signupForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
    careerLevel: ['', Validators.required],
    userName: ['', Validators.required],
    position: ['', Validators.required],
  });
  onSubmit() {
    console.log(this.signupForm.value);
  }
}
