import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { TokenStorageService } from '../../auth/token-storage.service';
import { RegisterPageComponent } from './register-page.component';
import {RouterTestingModule} from "@angular/router/testing";
import {AuthPageComponent} from "../auth-page/auth-page.component";

class MockAuthService {
    signUp(signUpInfo: any) {
        return of({ token: 'dummy-token' });
    }
}

class MockTokenStorageService {
    signOut() {}
    saveToken(token: string) {}
    saveEmail(email: string) {}
}

describe('RegisterPageComponent', () => {
    let component: RegisterPageComponent;
    let fixture: ComponentFixture<RegisterPageComponent>;
    let authService: AuthService;
    let tokenStorageService: TokenStorageService;
    let router: Router;



    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RegisterPageComponent],
            imports: [ReactiveFormsModule, RouterTestingModule,
                RouterTestingModule.withRoutes([
                    { path: 'sign-in', component: AuthPageComponent}
                ])],
            providers: [
                { provide: AuthService, useClass: MockAuthService },
                { provide: TokenStorageService, useClass: MockTokenStorageService }
            ]
        }).compileComponents();


    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterPageComponent);
        component = fixture.componentInstance;
        authService = TestBed.inject(AuthService);
        tokenStorageService = TestBed.inject(TokenStorageService);
        router = TestBed.inject(Router);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize form', () => {
        expect(component.registerForm).toBeTruthy();
        expect(component.registerForm.controls['fullname']).toBeTruthy();
        expect(component.registerForm.controls['email']).toBeTruthy();
        expect(component.registerForm.controls['password']).toBeTruthy();
        expect(component.registerForm.controls['confirmPassword']).toBeTruthy();
    });

    it('should validate name correctly', () => {
        expect(component['isValidName']('Valid Name')).toBeTrue();
        expect(component['isValidName']('Invalid Name123')).toBeFalse();
    });

    it('should validate email format', () => {
        component.registerForm.controls['email'].setValue('invalidemail');
        component.onSubmit();
        expect(component.registerForm.controls['email'].hasError('emailFormat')).toBeTrue();

        component.registerForm.controls['email'].setValue('validemail@example.com');
        component.onSubmit();
        expect(component.registerForm.controls['email'].hasError('emailFormat')).toBeFalse();
    });

    it('should validate password mismatch', () => {
        component.registerForm.controls['password'].setValue('password123');
        component.registerForm.controls['confirmPassword'].setValue('password321');
        component.onSubmit();
        expect(component.registerForm.controls['confirmPassword'].hasError('passwordMismatch')).toBeFalse();
    });

    it('should not submit if form is invalid', () => {
        spyOn(authService, 'signUp').and.callThrough();
        component.registerForm.controls['fullname'].setValue('');
        component.onSubmit();
        expect(authService.signUp).not.toHaveBeenCalled();
    });

    it('should submit if form is valid', () => {
        spyOn(authService, 'signUp').and.callThrough();
        spyOn(tokenStorageService, 'saveToken').and.callThrough();
        spyOn(tokenStorageService, 'saveEmail').and.callThrough();
        spyOn(router, 'navigate').and.callThrough();

        component.registerForm.controls['fullname'].setValue('John Doe');
        component.registerForm.controls['email'].setValue('john@example.com');
        component.registerForm.controls['password'].setValue('password123');
        component.registerForm.controls['confirmPassword'].setValue('password123');
        component.onSubmit();

        expect(authService.signUp).toHaveBeenCalled();
        expect(tokenStorageService.saveToken).toHaveBeenCalledWith('dummy-token');
        expect(tokenStorageService.saveEmail).toHaveBeenCalledWith('john@example.com');
        expect(router.navigate).toHaveBeenCalledWith(['/sign-in']);
    });

    it('should handle backend error during sign up', () => {
        spyOn(authService, 'signUp').and.returnValue(throwError({ status: 409 }));
        component.registerForm.controls['fullname'].setValue('John Doe');
        component.registerForm.controls['email'].setValue('john@example.com');
        component.registerForm.controls['password'].setValue('password123');
        component.registerForm.controls['confirmPassword'].setValue('password123');
        component.onSubmit();

        expect(component.fromBackError).toBeTrue();
    });

    it('should reset fromBackError on email input click', () => {
        component.fromBackError = true;
        component.onEmailInputClicked();
        expect(component.fromBackError).toBeFalse();
    });

    it('should reset nameError on FIO input click', () => {
        component.nameError = true;
        component.onFIOInputClicked();
        expect(component.nameError).toBeFalse();
    });
});
