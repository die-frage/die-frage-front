import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from "../auth/auth.service";
import {TokenStorageService} from "../auth/token-storage.service";
import {SignInInfo} from "../auth/responces/SignInInfo";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent {
  loginForm: FormGroup;
  submitted = false;
  fromBackError = false;

  constructor (private formBuilder: FormBuilder,
               private authService: AuthService,
               private tokenStorage: TokenStorageService,
               private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  onSubmit(){
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const loginInInfo = new SignInInfo(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value);
    this.authService.signIn(loginInInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveEmail(loginInInfo.email);
        this.router.navigate(['']);
      },
      error => {
        if (error.status === 404 || error.status === 403) {
          this.fromBackError = true;
        }
      }
    )
  }

  onEmailOrPasswordInputClicked() {
    this.fromBackError = false;
  }

}
