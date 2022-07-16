import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/interfaces/User.model';
import { AuthResponseData } from 'src/app/interfaces/AuthResponseData.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService, public router: Router) {}

  signupForm: FormGroup;
  isLoading: boolean = false;
  error: string;

  isLoginMode = true;

  // signupFormSubmit() {
  //   this.isLoginMode = !this.isLoginMode;
  // }

  signupFormSubmit() {
    if (!this.signupForm.valid) {
      return;
    }

    let authObs: Observable<AuthResponseData>;

    //   this.isLoading = true;

    // if (this.isLoginMode) {
    //   authObs = this.authService.login(email, password);
    // } else {
    authObs = this.authService.signup(this.signupForm.value);
    // }

    authObs.subscribe(
      (resData) => {
        console.log(resData);
        this.router.navigate(['/home']);
      },
      (errorMessage) => {
        console.log(errorMessage);
      }
    );

    this.signupForm.reset();
  }

  inputFocusHandler() {
    this.error = undefined;
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  // signupFormSubmit() {
  //   console.log({ ...this.signupForm.value });
  //   this.isLoading = true;
  //   this.authService.signup({ ...this.signupForm.value }).subscribe({
  //     next: (res: any) => {
  //       this.isLoading = false;
  //       localStorage.setItem('token', res.idToken);
  //       this.router.navigateByUrl('/home');
  //     },
  //     error: (err: any) => {
  //       console.log(err);
  //       this.isLoading = false;
  //       this.error = err;
  //       console.log(this.error?.['error']?.['error']?.message);
  //     },
  //   });
  // let authObs: Observable<AuthResponseData>;
  // this.authService.signup(this.signupForm.value);
  // }
}
