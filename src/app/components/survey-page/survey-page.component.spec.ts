import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { SurveyPageComponent } from './survey-page.component';
import { TokenStorageService } from '../../auth/token-storage.service';
import { SurveyService } from '../../services/survey.service';
import { UserService } from '../../services/user.service';
import { User } from '../../entities/user';
import { Survey } from '../../entities/survey';
import { Status } from '../../entities/status';
import { ReactiveFormsModule } from '@angular/forms';

describe('SurveyPageComponent', () => {
    let component: SurveyPageComponent;
    let fixture: ComponentFixture<SurveyPageComponent>;
    let mockTokenStorageService: any;
    let mockUserService: any;
    let mockSurveyService: any;
    let mockRouter: any;

    beforeEach(async () => {
        mockTokenStorageService = jasmine.createSpyObj('TokenStorageService', ['getUserName', 'getToken']);
        mockUserService = jasmine.createSpyObj('UserService', ['getUserByEmail']);
        mockSurveyService = jasmine.createSpyObj('SurveyService', ['stopSurvey', 'startSurvey', 'deleteSurvey', 'nextQuestion']);
        mockRouter = jasmine.createSpyObj('Router', ['navigate']);

        await TestBed.configureTestingModule({
            declarations: [SurveyPageComponent],
            imports: [ReactiveFormsModule],
            providers: [
                { provide: TokenStorageService, useValue: mockTokenStorageService },
                { provide: UserService, useValue: mockUserService },
                { provide: SurveyService, useValue: mockSurveyService },
                { provide: Router, useValue: mockRouter },
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SurveyPageComponent);
        component = fixture.componentInstance;
        mockTokenStorageService.getUserName.and.returnValue('test@example.com');
        mockTokenStorageService.getToken.and.returnValue('fake-token');
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize user and survey on ngOnInit', async () => {
        const mockUser: User = new User(1, 'John', 'Doe', 'Smith', 'john.doe@example.com', 'password123');
        const mockStatus: Status = new Status(1, 'CREATED_STATUS');
        const mockSurvey: Survey = new Survey(
            1, 'Test Survey', 'Description', 100, 'code123', 'http://example.com/survey', 'qrCode123',
            '2024-01-01T00:00:00Z', '2024-01-31T00:00:00Z', true, false, mockUser, mockStatus, []
        );

        mockUserService.getUserByEmail.and.returnValue(of(mockUser).toPromise());
        spyOnProperty(history, 'state', 'get').and.returnValue({ survey: mockSurvey }); // Mocking history.state.survey

        await component.ngOnInit();

        expect(component.survey).toEqual(mockSurvey);
        expect(component.surveyTitle).toBe(mockSurvey.title);
        expect(component.description).toBe(mockSurvey.description);
    });

    it('should navigate to analyse survey', () => {
        const mockStatus: Status = new Status(1, 'CREATED_STATUS');
        const mockSurvey: Survey = new Survey(
            1, 'Test Survey', 'Description', 100, 'code123', 'http://example.com/survey', 'qrCode123',
            '2024-01-01T00:00:00Z', '2024-01-31T00:00:00Z', true, false, new User(1, 'John', 'Doe', 'Smith', 'john.doe@example.com', 'password123'), mockStatus, []
        );

        component.survey = mockSurvey;

        component.analyseSurvey();

        expect(mockRouter.navigate).toHaveBeenCalledWith(['/analyse-survey'], { state: { survey: mockSurvey } });
    });

    it('should navigate to edit survey', () => {
        const mockStatus: Status = new Status(1, 'CREATED_STATUS');
        const mockSurvey: Survey = new Survey(
            1, 'Test Survey', 'Description', 100, 'code123', 'http://example.com/survey', 'qrCode123',
            '2024-01-01T00:00:00Z', '2024-01-31T00:00:00Z', true, false, new User(1, 'John', 'Doe', 'Smith', 'john.doe@example.com', 'password123'), mockStatus, []
        );

        component.survey = mockSurvey;

        component.editSurvey();

        expect(mockRouter.navigate).toHaveBeenCalledWith(['/edit-survey'], { state: { survey: mockSurvey } });
    });

    it('should format date correctly', () => {
        const date = '2024-01-01T00:00:00Z';
        const formattedDate = component.getFormattedDate(date);
        expect(formattedDate).toBe('01.01.24, 03:00');
    });

    it('should copy survey link to clipboard', () => {
        const mockStatus: Status = new Status(1, 'CREATED_STATUS');
        const mockSurvey: Survey = new Survey(
            1, 'Test Survey', 'Description', 100, 'code123', 'http://example.com/survey', 'qrCode123',
            '2024-01-01T00:00:00Z', '2024-01-31T00:00:00Z', true, false, new User(1, 'John', 'Doe', 'Smith', 'john.doe@example.com', 'password123'), mockStatus, []
        );

        component.survey = mockSurvey;

        spyOn(document, 'execCommand').and.callThrough();

        component.copyLink();

        expect(document.execCommand).toHaveBeenCalledWith('copy');
    });

    it('should download file', async () => {
        const mockFetch = jasmine.createSpy().and.returnValue(Promise.resolve(new Response(new Blob())));
        spyOn(window, 'fetch').and.callFake(mockFetch);

        await component.downloadFile('assets/files/sample.docx');

        expect(window.fetch).toHaveBeenCalledWith('assets/files/sample.docx');
    });

    it('should start and clear timer', () => {
        jasmine.clock().install();
        component.initialTime = 10;
        component.startTimer();
        expect(component.remainingTime).toBe(10);

        jasmine.clock().tick(5000);
        expect(component.remainingTime).toBe(5);

        component.clearTimer();
        jasmine.clock().tick(5000);
        expect(component.remainingTime).toBe(5);

        jasmine.clock().uninstall();
    });
});
