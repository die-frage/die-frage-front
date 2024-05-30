import { Survey } from './survey';
import { User } from './user';
import { Status } from './status';
import { Question } from './question';

describe('Survey', () => {
    let survey: Survey;
    let user: User;
    let status: Status;
    let questions: Question[];

    beforeEach(() => {
        user = new User(1, 'John', 'Doe', 'Smith', 'john.doe@example.com', 'password123');
        status = new Status(1, 'CREATED_STATUS');
        questions = [
            new Question(1, 'What is your favorite color?', 'text', [], [], 10, 60),
            new Question(2, 'What is your age?', 'number', [], [], 5, 30)
        ];

        survey = new Survey(
            1,
            'Customer Satisfaction Survey',
            'A survey to gauge customer satisfaction',
            100,
            'SURV123',
            'http://example.com/survey/SURV123',
            'http://example.com/qrcode/SURV123',
            '2023-01-01T00:00:00Z',
            '2023-01-31T23:59:59Z',
            true,
            false,
            user,
            status,
            questions
        );
    });

    it('should create an instance', () => {
        expect(survey).toBeTruthy();
    });

    it('should have the correct id', () => {
        expect(survey.id).toBe(1);
    });

    it('should have the correct title', () => {
        expect(survey.title).toBe('Customer Satisfaction Survey');
    });

    it('should have the correct description', () => {
        expect(survey.description).toBe('A survey to gauge customer satisfaction');
    });

    it('should have the correct max_students', () => {
        expect(survey.max_students).toBe(100);
    });

    it('should have the correct code', () => {
        expect(survey.code).toBe('SURV123');
    });

    it('should have the correct link', () => {
        expect(survey.link).toBe('http://example.com/survey/SURV123');
    });

    it('should have the correct qr_code', () => {
        expect(survey.qr_code).toBe('http://example.com/qrcode/SURV123');
    });

    it('should have the correct date_begin', () => {
        expect(survey.date_begin).toBe('2023-01-01T00:00:00Z');
    });

    it('should have the correct date_end', () => {
        expect(survey.date_end).toBe('2023-01-31T23:59:59Z');
    });

    it('should have the correct is_interactive flag', () => {
        expect(survey.is_interactive).toBe(true);
    });

    it('should have the correct anonymous flag', () => {
        expect(survey.anonymous).toBe(false);
    });

    it('should have the correct user', () => {
        expect(survey.user).toBe(user);
    });

    it('should have the correct status', () => {
        expect(survey.status).toBe(status);
    });

    it('should have the correct questions', () => {
        expect(survey.questions).toBe(questions);
    });

    it('should have the correct number of questions', () => {
        expect(survey.questions.length).toBe(2);
    });
});
