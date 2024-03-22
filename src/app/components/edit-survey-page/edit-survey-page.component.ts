import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../auth/token-storage.service";
import {UserService} from "../../services/user.service";
import {SurveyService} from "../../services/survey.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../entities/user";
import {Survey} from "../../entities/survey";
import {Question} from "../../entities/question";

@Component({
    selector: 'app-edit-survey-page',
    templateUrl: './edit-survey-page.component.html',
    styleUrls: ['./edit-survey-page.component.css']
})
export class EditSurveyPageComponent {
    surveyName: string;
    surveyDescription: string;
    startTime: string | undefined;
    endTime: string | undefined;
    maxParticipants: number;
    isAnonymous: boolean;
    questions: Question[];
    indexQuestion: number;

    constructor(private token: TokenStorageService,
                private userService: UserService,
                private surveyService: SurveyService,
                private route: ActivatedRoute,
                private router: Router) {

        this.survey = history.state.survey;
        console.log(this.survey);
        this.surveyName = this.survey.title;
        this.isAnonymous = this.survey.anonymous;
        this.startTime = this.formatDate(new Date(this.survey.date_begin));
        this.endTime = this.formatDate(new Date(this.survey.date_end));
        this.surveyDescription = "";
        this.maxParticipants = this.survey.max_students;
        this.questions = this.survey.questions;
        this.indexQuestion = this.survey.questions.length - 1;

    }

    info: any;
    user: User | undefined;
    survey: Survey;
    minStartTime: Date = new Date();
    minEndTime: Date = new Date();

    async ngOnInit() {
        this.info = {
            username: this.token.getUserName(),
            token: this.token.getToken()
        };
        this.user = await this.getUserByEmail(this.info.username);
    }

    async getUserByEmail(email: string): Promise<User | undefined> {
        try {
            const urlEmail = email.replace(/@/g, '%40');
            return await this.userService.getUserByEmail(urlEmail).toPromise();
        } catch (error) {
            return undefined;
        }
    }

    step: number = 0;

    cancel() {
        this.router.navigate(['']);
    }

    previousStep() {
        this.step--;
    }

    nextStep(CurrentStep: number) {
        switch (CurrentStep) {
            case 0: {
                this.step++;
                break;
            }
            case 1: {
                if (this.startTime == undefined || this.endTime == undefined) {
                    this.step = 1;
                    return;
                } else if (this.startTime > this.endTime) {
                    this.startTime = undefined;
                    this.endTime = undefined;
                    this.step = 1;
                    return;
                } else if (new Date(this.startTime) < new Date()) {
                    this.startTime = undefined;
                    this.endTime = undefined;
                    this.step = 1;
                    return;
                } else {
                    this.step++;
                }
                break;
            }
            case 2: {
                if (this.surveyName == null || this.surveyName === "") {
                    this.step = 2;
                } else {
                    this.step++;
                }
                break;
            }
            case 3: {
                if (this.surveyDescription == null || this.surveyDescription === "") {
                    this.step = 3;
                } else {
                    this.step++;
                }
                break;
            }
            case 4: {
                if (this.maxParticipants == null || this.maxParticipants < 1 || this.maxParticipants > 50) {
                    this.step = 4;
                } else {
                    this.step++;
                }
                break;
            }

            default: {
                this.step++;
            }
        }
    }

    chooseAnonymous() {
        this.isAnonymous = true;
    }

    chooseNotAnonymous() {
        this.isAnonymous = false;
    }

    toggleOptions(question: Question) {
        if (question.type_question === "NO_CHOICE") {
            question.type_question = "MULTIPLE";
            question.incorrect_answers = [];
            question.correct_answers = [];
        } else {
            question.type_question = "NO_CHOICE";
            question.incorrect_answers = [];
            question.correct_answers = [];
        }
    }

    updateSurvey() {
        this.clearQuestions();
        const surveyData = {
            title: this.surveyName,
            // description: this.surveyDescription,
            anonymous: this.isAnonymous,
            date_begin: this.startTime,
            date_end: this.endTime,
            max_students: this.maxParticipants,
            questions: this.questions
        };
        if (!this.user) return;

        this.surveyService.updateSurvey(this.user.id, this.survey.id, surveyData).subscribe((response) => {
            this.router.navigate(['/']);
        }, error => {

        });
    }


    addNewQuestion() {
        this.questions.push(new Question(this.indexQuestion++, "", "MULTIPLE", [], [], 1, 600))
    }

    addNewIncorrectAnswer(question: Question) {
        question.incorrect_answers.push("");
    }

    containsOnlySpaces(str: string): boolean {
        return str.trim() === '';
    }

    clearQuestions() {
        for (let i = this.questions.length - 1; i >= 0; i--) {
            let question = this.questions[i].question;
            if (question.length < 1 || this.containsOnlySpaces(question)) {
                this.questions.splice(i, 1);
            }
        }

        for (let i = this.questions.length - 1; i >= 0; i--) {
            let question = this.questions[i];
            if (question.type_question === "MULTIPLE") {
                // correct answers check
                const corAnswer = question.correct_answers[0];
                if (question.correct_answers.length != 1 || this.containsOnlySpaces(corAnswer)) {
                    this.questions.splice(i, 1);
                    continue;
                }

                // incorrect answer check
                const incorrectAnswer = question.incorrect_answers;
                for (let j = incorrectAnswer.length - 1; j >= 0; j--) {
                    if (incorrectAnswer[j] == null || this.containsOnlySpaces(incorrectAnswer[j])) {
                        incorrectAnswer.splice(j, 1);
                    }
                }
                if (incorrectAnswer.length < 1) this.questions.splice(i, 1);
                else this.questions[i].incorrect_answers = incorrectAnswer;
            }
        }
    }

    deleteQuestion(index: number) {
        this.questions.splice(index, 1);
    }

    updateQuestion(value: string, index: number, type: string) {
        if (type === 'question') {
            this.questions[index].question = value;
        }
    }

    updateIncorrectAnswer(value: string, questionIndex: number, answerIndex: number) {
        this.questions[questionIndex].incorrect_answers[answerIndex] = value;
    }

    updateCorrectAnswer(value: string, questionIndex: number, correctAnswer: string) {
        this.questions[questionIndex].correct_answers[0] = value;
    }

    updatePoints(value: number, i: number, points: string) {
        if (points === 'points') {
            this.questions[i].points = value;
        }
    }

    updateTimeLimit(value: number, i: number, timeLimit: string) {
        if (timeLimit === 'time_limit') {
            this.questions[i].time_limit = value;
        }
    }

    formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

}
