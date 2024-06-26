import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {SignUpInfo} from "../../auth/responces/SignUpInfo";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../auth/token-storage.service";

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
    registerForm: FormGroup;
    submitted = false;
    fromBackError = false;
    nameError = false;

    constructor(private formBuilder: FormBuilder,
                private authService: AuthService,
                private tokenStorage: TokenStorageService,
                private router: Router) {

        this.tokenStorage.signOut();
        this.registerForm = this.formBuilder.group({
            fullname: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
        });
    }

    get formControls() {
        return this.registerForm.controls;
    }

    onSubmit() {
        this.submitted = true;

        const fullName: string = this.registerForm.get('fullname')?.value;
        const fio: string[] = fullName.split(' ');
        let lastName: string | null = ' ';
        let firstName: string | null = ' ';
        let patronymic: string | null = ' ';

        if (fio.length > 0 && fio[0] !== null) {
            lastName = fio[0];
        }
        if (fio.length > 1 && fio[1] !== null) {
            firstName = fio[1];
        }
        if (fio.length > 2 && fio[2] !== null) {
            patronymic = fio[2];
        }

        if (!this.isValidName(lastName)) {
            this.nameError = true;
        }

        if (!this.isValidName(firstName)) {
            this.nameError = true;
        }

        if (!this.isValidName(patronymic)) {
            this.nameError = true;
        }

        if (this.nameError){
            return;
        }

        let email: string = this.registerForm.get('email')?.value;
        if (!email.includes(".") || !email.includes("@")){
            this.registerForm.controls['email'].setErrors({'emailFormat': true});
            return;
        }

        if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
            this.registerForm.controls['confirmPassword'].setErrors({'passwordMismatch': true});
            return;
        }

        if (this.registerForm.invalid) {
            return;
        }

        const signUpInfo = new SignUpInfo(
            this.registerForm.get('email')?.value,
            this.registerForm.get('password')?.value,
            lastName,
            firstName,
            patronymic,
        );

        this.authService.signUp(signUpInfo).subscribe(
            data => {
                this.tokenStorage.saveToken(data.token);
                this.tokenStorage.saveEmail(signUpInfo.email);
                this.router.navigate(['/sign-in']);
            },
            error => {
                if (error.status === 409) {
                    this.fromBackError = true;
                }
                console.error('Error during registration user:', error);
            }
        )
    }

    onEmailInputClicked() {
        this.fromBackError = false;
    }

    onFIOInputClicked() {
        this.nameError = false;
    }

    private isValidName(name: string | null): boolean {
        if (name === null) {
            return false;
        }
        const regex = /^[a-zA-Zа-яА-ЯёЁ\s]*$/;
        return regex.test(name);
    }
}
