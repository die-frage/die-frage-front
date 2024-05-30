import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomePageComponent } from './home-page.component';
import { TokenStorageService } from '../../auth/token-storage.service';
import { SurveyService } from '../../services/survey.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

describe('HomePageComponent', () => {
    let component: HomePageComponent;
    let fixture: ComponentFixture<HomePageComponent>;
    let tokenStorageService: jasmine.SpyObj<TokenStorageService>;
    let userService: jasmine.SpyObj<UserService>;
    let surveyService: jasmine.SpyObj<SurveyService>;
    let router: Router;

    beforeEach(async () => {
        tokenStorageService = jasmine.createSpyObj('TokenStorageService', ['getUserName', 'getToken']);
        userService = jasmine.createSpyObj('UserService', ['getUserByEmail']);
        surveyService = jasmine.createSpyObj('SurveyService', ['getAllSurveysByProfessorId']);

        await TestBed.configureTestingModule({
            declarations: [HomePageComponent],
            imports: [RouterTestingModule],
            providers: [
                { provide: TokenStorageService, useValue: tokenStorageService },
                { provide: UserService, useValue: userService },
                { provide: SurveyService, useValue: surveyService }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(HomePageComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        fixture.detectChanges();
    });

    afterEach(() => {
        fixture.destroy();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('ngOnInit', () => {
        it('should handle errors during initialization', async () => {
            tokenStorageService.getUserName.and.returnValue('test@example.com');
            userService.getUserByEmail.and.throwError('Error fetching user');
            surveyService.getAllSurveysByProfessorId.and.throwError('Error fetching surveys');

            await component.ngOnInit();

            expect(component.info.token).toBeUndefined();
            expect(component.user).toBeUndefined();
            expect(component.surveysAll).toBeUndefined();
            expect(component.surveys).toBeUndefined();
        });
    });
});

