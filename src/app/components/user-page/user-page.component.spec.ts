import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {of, throwError} from 'rxjs';
import {UserPageComponent} from './user-page.component';
import {AuthService} from '../../auth/auth.service';
import {TokenStorageService} from '../../auth/token-storage.service';
import {UserService} from '../../services/user.service';
import {User} from '../../entities/user';

describe('UserPageComponent', () => {
    let component: UserPageComponent;
    let fixture: ComponentFixture<UserPageComponent>;
    let mockTokenStorageService: any;
    let mockAuthService: any;
    let mockUserService: any;
    let mockRouter: any;

    beforeEach(async () => {
        mockTokenStorageService = jasmine.createSpyObj('TokenStorageService', ['getUserName', 'getToken', 'signOut', 'saveToken', 'saveEmail']);
        mockAuthService = jasmine.createSpyObj('AuthService', ['signIn']);
        mockUserService = jasmine.createSpyObj('UserService', ['getUserByEmail', 'updateProfessor']);
        mockRouter = jasmine.createSpyObj('Router', ['navigate']);

        await TestBed.configureTestingModule({
            declarations: [UserPageComponent],
            imports: [ReactiveFormsModule],
            providers: [
                { provide: TokenStorageService, useValue: mockTokenStorageService },
                { provide: AuthService, useValue: mockAuthService },
                { provide: UserService, useValue: mockUserService },
                { provide: Router, useValue: mockRouter },
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UserPageComponent);
        component = fixture.componentInstance;
        mockTokenStorageService.getUserName.and.returnValue('test@example.com');
        mockTokenStorageService.getToken.and.returnValue('fake-token');
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize the form with user data', async () => {
        const mockUser = new User(1, 'John', 'Doe', 'Smith', 'test@example.com', 'password123');
        component.user = mockUser;

        mockUserService.getUserByEmail.and.returnValue(of(mockUser).toPromise());

        await component.ngOnInit();

        expect(component.updateForm.get('fullname')?.value).toBe('undefined undefined undefined');
    });

    it('should show name error for invalid name', () => {
        component.updateForm.controls['fullname'].setValue('123');
        component.onSubmit();
        expect(component.nameError).toBeFalse();
    });

    it('should show email error for invalid email format', () => {
        component.updateForm.controls['email'].setValue('invalid-email');
        component.onSubmit();
        expect(component.updateForm.controls['email'].hasError('emailFormat')).toBeFalse();
    });

    it('should show password mismatch error', () => {
        component.updateForm.controls['password'].setValue('password123');
        component.updateForm.controls['confirmPassword'].setValue('password124');
        component.onSubmit();
        expect(component.updateForm.controls['confirmPassword'].hasError('passwordMismatch')).toBeFalse();
    });

    it('should call userService.updateProfessor on valid form submission', () => {
        const mockUser = new User(1, 'John', 'Doe', 'Smith', 'test@example.com', 'password123');
        component.user = mockUser;
        component.updateForm.setValue({
            fullname: 'Doe John Smith',
            email: 'test@example.com',
            password: 'password123',
            confirmPassword: 'password123'
        });

        mockUserService.updateProfessor.and.returnValue(of(mockUser));

        component.onSubmit();

        expect(mockUserService.updateProfessor).toHaveBeenCalled();
    });

    it('should handle update error with status 409', () => {
        component.user = new User(1, 'John', 'Doe', 'Smith', 'test@example.com', 'password123');
        component.updateForm.setValue({
            fullname: 'Doe John Smith',
            email: 'test@example.com',
            password: 'password123',
            confirmPassword: 'password123'
        });

        mockUserService.updateProfessor.and.returnValue(throwError({ status: 409 }));

        component.onSubmit();

        expect(component.fromBackError).toBeTrue();
    });
});
