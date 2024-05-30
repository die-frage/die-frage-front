import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SurveyService } from './survey.service';
import { Survey } from '../entities/survey';
import { Question } from '../entities/question';
import { User } from '../entities/user';
import { Status } from '../entities/status';

describe('SurveyService', () => {
    let service: SurveyService;
    let httpMock: HttpTestingController;
    const baseUrl = 'http://localhost:8787/api/survey';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [SurveyService]
        });
        service = TestBed.inject(SurveyService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    const exampleUser = new User(1, 'John', 'Doe', 'Middle', 'john.doe@example.com', 'password123');
    const exampleStatus = new Status(1, 'CREATED');

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should retrieve all surveys by professor ID', () => {
        const mockSurveys: Survey[] = [
            new Survey(1, 'Survey 1', 'Description 1', 10, 'code1', 'link1', 'qr_code1', '2023-01-01', '2023-01-02', true, false, exampleUser, exampleStatus, []),
            new Survey(2, 'Survey 2', 'Description 2', 20, 'code2', 'link2', 'qr_code2', '2023-01-01', '2023-01-02', true, false, exampleUser, exampleStatus, [])
        ];

        service.getAllSurveysByProfessorId(1).subscribe(surveys => {
            expect(surveys.length).toBe(2);
            expect(surveys).toEqual(mockSurveys);
        });

        const req = httpMock.expectOne(`${baseUrl}/1/all`);
        expect(req.request.method).toBe('GET');
        req.flush(mockSurveys);
    });

    it('should add a new survey', () => {
        const mockSurvey: Survey = new Survey(1, 'Survey 1', 'Description 1', 10, 'code1', 'link1', 'qr_code1', '2023-01-01', '2023-01-02', true, false, exampleUser, exampleStatus, []);
        const surveyData = { title: 'Survey 1', description: 'Description 1', date_begin: '2023-01-01', date_end: '2023-01-02', max_students: 10, questions: [] };

        service.addSurvey(1, surveyData).subscribe(survey => {
            expect(survey).toEqual(mockSurvey);
        });

        const req = httpMock.expectOne(`${baseUrl}/1/add`);
        expect(req.request.method).toBe('POST');
        req.flush(mockSurvey);
    });

    it('should delete a survey', () => {
        const mockSurvey: Survey = new Survey(1, 'Survey 1', 'Description 1', 10, 'code1', 'link1', 'qr_code1', '2023-01-01', '2023-01-02', true, false, exampleUser, exampleStatus, []);

        service.deleteSurvey(1, 1).subscribe(survey => {
            expect(survey).toEqual(mockSurvey);
        });

        const req = httpMock.expectOne(`${baseUrl}/1/1/delete`);
        expect(req.request.method).toBe('DELETE');
        req.flush(mockSurvey);
    });

    it('should start a survey', () => {
        const mockSurvey: Survey = new Survey(1, 'Survey 1', 'Description 1', 10, 'code1', 'link1', 'qr_code1', '2023-01-01', '2023-01-02', true, false, exampleUser, exampleStatus, []);

        service.startSurvey(1, 1).subscribe(survey => {
            expect(survey).toEqual(mockSurvey);
        });

        const req = httpMock.expectOne(`${baseUrl}/1/1/start`);
        expect(req.request.method).toBe('PUT');
        req.flush(mockSurvey);
    });

    it('should stop a survey', () => {
        const mockSurvey: Survey = new Survey(1, 'Survey 1', 'Description 1', 10, 'code1', 'link1', 'qr_code1', '2023-01-01', '2023-01-02', true, false, exampleUser, exampleStatus, []);

        service.stopSurvey(1, 1).subscribe(survey => {
            expect(survey).toEqual(mockSurvey);
        });

        const req = httpMock.expectOne(`${baseUrl}/1/1/stop`);
        expect(req.request.method).toBe('PUT');
        req.flush(mockSurvey);
    });

    it('should update a survey', () => {
        const mockSurvey: Survey = new Survey(1, 'Survey 1', 'Description 1', 10, 'code1', 'link1', 'qr_code1', '2023-01-01', '2023-01-02', true, false, exampleUser, exampleStatus, []);
        const surveyData = { title: 'Survey 1', description: 'Description 1', date_begin: '2023-01-01', date_end: '2023-01-02', max_students: 10, questions: [] };

        service.updateSurvey(1, 1, surveyData).subscribe(survey => {
            expect(survey).toEqual(mockSurvey);
        });

        const req = httpMock.expectOne(`${baseUrl}/1/1/update`);
        expect(req.request.method).toBe('PUT');
        req.flush(mockSurvey);
    });

    it('should add a survey from an Excel file', () => {
        const mockSurvey: Survey = new Survey(1, 'Survey 1', 'Description 1', 10, 'code1', 'link1', 'qr_code1', '2023-01-01', '2023-01-02', true, false, exampleUser, exampleStatus, []);
        const file = new File([''], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        service.addSurveyExcel(1, file).subscribe(survey => {
            expect(survey).toEqual(mockSurvey);
        });

        const req = httpMock.expectOne(`${baseUrl}/1/add/excel`);
        expect(req.request.method).toBe('POST');
        req.flush(mockSurvey);
    });

    it('should get the next question', () => {
        const mockQuestion: Question = new Question(1, 'Question 1', 'MULTIPLE', ['Incorrect'], ['Correct'], 1, 600);

        service.nextQuestion(1, 1, 1).subscribe(question => {
            expect(question).toEqual(mockQuestion);
        });

        const req = httpMock.expectOne(`${baseUrl}/next/question/1/1/1`);
        expect(req.request.method).toBe('GET');
        req.flush(mockQuestion);
    });
});
