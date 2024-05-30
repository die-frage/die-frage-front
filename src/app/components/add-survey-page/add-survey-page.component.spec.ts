import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { saveAs } from 'file-saver';
import { AddSurveyPageComponent } from './add-survey-page.component';
import { User } from '../../entities/user';
import { TokenStorageService } from '../../auth/token-storage.service';
import { UserService } from '../../services/user.service';
import { SurveyService } from '../../services/survey.service';
import { Question } from '../../entities/question';

describe('AddSurveyPageComponent', () => {
    let component: AddSurveyPageComponent;
    let fixture: ComponentFixture<AddSurveyPageComponent>;
    let surveyService: SurveyService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddSurveyPageComponent],
            imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
            providers: [TokenStorageService, UserService, SurveyService]
        })
            .compileComponents();
        surveyService = TestBed.inject(SurveyService);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AddSurveyPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should not proceed if survey type is not selected', () => {
        component.nextStep();
        expect(component.step).toBe(0);
    });

    it('should not proceed if survey name is not provided', () => {
        component.isRegularSurvey = true;
        component.nextStep();
        expect(component.step).toBe(0);
    });

    it('should not proceed if survey description is not provided', () => {
        component.isRegularSurvey = true;
        component.surveyName = 'Test Survey';
        component.nextStep();
        expect(component.step).toBe(0);
    });

    it('should not proceed if max participants is not within valid range', () => {
        component.isRegularSurvey = true;
        component.surveyName = 'Test Survey';
        component.surveyDescription = 'Description';
        component.nextStep();
        expect(component.step).toBe(0);
    });

    it('should not proceed if start time or end time is not provided', () => {
        component.isRegularSurvey = true;
        component.surveyName = 'Test Survey';
        component.surveyDescription = 'Description';
        component.maxParticipants = 10;
        component.nextStep();
        expect(component.step).toBe(0);
    });

    it('should not proceed if start time is after end time', () => {
        component.isRegularSurvey = true;
        component.surveyName = 'Test Survey';
        component.surveyDescription = 'Description';
        component.maxParticipants = 10;
        component.startTime = new Date('2024-06-01');
        component.endTime = new Date('2024-05-01');
        component.nextStep();
        expect(component.step).toBe(0);
    });

    it('should not proceed if start time is in the past', () => {
        component.isRegularSurvey = true;
        component.surveyName = 'Test Survey';
        component.surveyDescription = 'Description';
        component.maxParticipants = 10;
        component.startTime = new Date('2023-01-01');
        component.endTime = new Date('2024-01-01');
        component.nextStep();
        expect(component.step).toBe(0);
    });

    it('should add a new question to the array', () => {
        component.addNewQuestion();
        expect(component.questions.length).toBe(2); // Assuming initial length is 1
    });

    it('should set regular survey type and proceed to next step', () => {
        component.RegularSurvey();
        expect(component.isRegularSurvey).toBeTrue();
        expect(component.isInteractiveSurvey).toBeFalse();
        expect(component.step).toBe(0); // Assuming it should proceed to the next step
    });

    it('should set interactive survey type and proceed to next step', () => {
        component.InteractiveSurvey();
        expect(component.isInteractiveSurvey).toBeTrue();
        expect(component.isRegularSurvey).toBeFalse();
        expect(component.step).toBe(0); // Assuming it should proceed to the next step
    });

    it('should navigate to home page', () => {
        spyOn(component.router, 'navigate');
        component.cancel();
        expect(component.router.navigate).toHaveBeenCalledWith(['']);
    });

    it('should toggle question options correctly', () => {
        const question: Question = new Question(0, "", "NO_CHOICE", [], [], 1, 600);
        component.toggleOptions(question);
        expect(question.type_question).toBe("MULTIPLE");
    });

    it('should add a new question to the array', () => {
        component.addNewQuestion();
        expect(component.questions.length).toBe(2); // Assuming initial length is 1
    });

    it('should delete question at given index', () => {
        component.questions = [
            new Question(0, "Question 1", "MULTIPLE", [], [], 1, 600),
            new Question(1, "Question 2", "MULTIPLE", [], [], 1, 600)
        ];

        component.deleteQuestion(0);
        expect(component.questions.length).toBe(1);
        expect(component.questions[0].question).toBe("Question 2");
    });


    it('should add a new question with default values to the array', () => {
        const initialQuestionsLength = component.questions.length;
        component.addNewQuestion();
        expect(component.questions.length).toBe(initialQuestionsLength + 1);
        const lastQuestion = component.questions[component.questions.length - 1];
        expect(lastQuestion.question_id).toBe(initialQuestionsLength);
        expect(lastQuestion.question).toBe('');
        expect(lastQuestion.type_question).toBe('MULTIPLE');
        expect(lastQuestion.correct_answers).toEqual([]);
        expect(lastQuestion.incorrect_answers).toEqual([]);
        expect(lastQuestion.points).toBe(1);
        expect(lastQuestion.time_limit_sec).toBe(600);
    });

    it('should update the question text at the given index', () => {
        component.questions = [
            new Question(0, 'Question 1', 'MULTIPLE', [], [], 1, 600),
            new Question(1, 'Question 2', 'MULTIPLE', [], [], 1, 600)
        ];
        const newText = 'Updated question text';
        component.updateQuestion(newText, 1, 'question');
        expect(component.questions[1].question).toBe(newText);
    });

    it('should update the incorrect answer at the given index of the given question index', () => {
        const questionIndex = 0;
        component.questions = [
            new Question(0, 'Question 1', 'MULTIPLE', [], [], 1, 600),
            new Question(1, 'Question 2', 'MULTIPLE', [], [], 1, 600)
        ];
        const newAnswer = 'Updated incorrect answer';
        component.updateIncorrectAnswer(newAnswer, questionIndex, 0);
        expect(component.questions[questionIndex].incorrect_answers[0]).toBe(newAnswer);
    });

    it('should update the correct answer at the given index of the given question index', () => {
        const questionIndex = 0;
        component.questions = [
            new Question(0, 'Question 1', 'MULTIPLE', [], [], 1, 600),
            new Question(1, 'Question 2', 'MULTIPLE', [], [], 1, 600)
        ];
        const newAnswer = 'Updated correct answer';
        component.updateCorrectAnswer(newAnswer, questionIndex, 'old correct answer');
        expect(component.questions[questionIndex].correct_answers[0]).toBe(newAnswer);
    });

    it('should update the points at the given index of the given question index', () => {
        const questionIndex = 0;
        component.questions = [
            new Question(0, 'Question 1', 'MULTIPLE', [], [], 1, 600),
            new Question(1, 'Question 2', 'MULTIPLE', [], [], 1, 600)
        ];
        const newPoints = 5;
        component.updatePoints(newPoints, questionIndex, 'points');
        expect(component.questions[questionIndex].points).toBe(newPoints);
    });

    it('should update the time limit at the given index of the given question index', () => {
        const questionIndex = 0;
        component.questions = [
            new Question(0, 'Question 1', 'MULTIPLE', [], [], 1, 600),
            new Question(1, 'Question 2', 'MULTIPLE', [], [], 1, 600)
        ];
        const newTimeLimit = 120;
        component.updateTimeLimit(newTimeLimit, questionIndex, 'time_limit_sec');
        expect(component.questions[questionIndex].time_limit_sec).toBe(newTimeLimit);
    });





});
