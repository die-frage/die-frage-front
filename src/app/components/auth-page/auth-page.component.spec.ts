import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { AuthPageComponent } from './auth-page.component';
import { AuthService } from '../../auth/auth.service';
import { TokenStorageService } from '../../auth/token-storage.service';
import { Router } from '@angular/router';
import {SignInInfo} from "../../auth/responces/SignInInfo";

describe('AuthPageComponent', () => {
    let component: AuthPageComponent;
    let fixture: ComponentFixture<AuthPageComponent>;
    let authService: jasmine.SpyObj<AuthService>;
    let tokenStorage: jasmine.SpyObj<TokenStorageService>;
    let router: Router;

    beforeEach(async () => {
        authService = jasmine.createSpyObj('AuthService', ['signIn']);
        tokenStorage = jasmine.createSpyObj('TokenStorageService', ['saveToken', 'saveEmail', 'signOut']);

        await TestBed.configureTestingModule({
            declarations: [ AuthPageComponent ],
            imports: [ ReactiveFormsModule, RouterTestingModule ],
            providers: [
                { provide: AuthService, useValue: authService },
                { provide: TokenStorageService, useValue: tokenStorage }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthPageComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('onSubmit', () => {
        it('should authenticate user with valid form', () => {
            const signInInfo = new SignInInfo('test@example.com', 'password123');
            const token = 'fake-token';
            authService.signIn.and.returnValue(of({ token }));
            const navigateSpy = spyOn(router, 'navigate');

            component.loginForm.setValue({
                email: signInInfo.email,
                password: signInInfo.password
            });
            component.onSubmit();

            expect(authService.signIn).toHaveBeenCalledWith(jasmine.objectContaining({
                email: signInInfo.email,
                password: signInInfo.password
            }));
            expect(tokenStorage.saveToken).toHaveBeenCalledWith(token);
            expect(tokenStorage.saveEmail).toHaveBeenCalledWith(signInInfo.email);
        });

        it('should not authenticate user with invalid form', () => {
            const signInInfo = { email: 'test@example.com', password: 'short' };
            component.loginForm.setValue(signInInfo);

            component.onSubmit();

            expect(authService.signIn).not.toHaveBeenCalled();
            expect(tokenStorage.saveToken).not.toHaveBeenCalled();
            expect(tokenStorage.saveEmail).not.toHaveBeenCalled();
        });

        it('should handle authentication error', () => {
            const signInInfo = new SignInInfo('test@example.com', 'password123');
            const error = { status: 404 };
            authService.signIn.and.returnValue(throwError(error));
            component.loginForm.setValue({
                email: signInInfo.email,
                password: signInInfo.password
            });

            component.onSubmit();

            expect(authService.signIn).toHaveBeenCalledWith(jasmine.objectContaining({
                email: signInInfo.email,
                password: signInInfo.password
            }));
            expect(tokenStorage.saveToken).not.toHaveBeenCalled();
            expect(tokenStorage.saveEmail).not.toHaveBeenCalled();
            expect(component.fromBackError).toBeTrue();
        });
    });

    describe('onEmailOrPasswordInputClicked', () => {
        it('should reset fromBackError flag', () => {
            component.fromBackError = true;

            component.onEmailOrPasswordInputClicked();

            expect(component.fromBackError).toBeFalse();
        });
    });
});
