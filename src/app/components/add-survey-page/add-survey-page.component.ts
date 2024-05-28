import { Component } from '@angular/core';
import {User} from "../../entities/user";
import {TokenStorageService} from "../../auth/token-storage.service";
import {UserService} from "../../services/user.service";
import {SurveyService} from "../../services/survey.service";
import {Router} from "@angular/router";
import {Question} from "../../entities/question";
import {saveAs} from "file-saver";

@Component({
    selector: 'app-add-survey-page',
    templateUrl: './add-survey-page.component.html',
    styleUrls: ['./add-survey-page.component.css']
})
export class AddSurveyPageComponent {
    info: any;
    user: User | undefined;
    fromBackError = false;

    isRegularSurvey: boolean | undefined;
    isInteractiveSurvey: boolean | undefined;
    surveyName: string = '';
    surveyDescription: string = '';
    startTime: Date | undefined;
    endTime: Date | undefined;
    maxParticipants: number = 0;
    indexQuestion = 0;
    questions: Question[] = [new Question(this.indexQuestion++, "", "MULTIPLE", [], [], 1, 600)];

    minStartTime: Date = new Date();
    minEndTime: Date = new Date();

    fileGot: boolean = false;
    private file: File | undefined;

    constructor(private token: TokenStorageService,
                private userService: UserService,
                private surveyService: SurveyService,
                private router: Router) {
    }

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
            console.error('Error getting info about user:', error);
            return undefined;
        }
    }

    step: number = -1;

    nextStep() {
        if (this.step == -1) {
            this.step = 0;
            return;
        }

        if ((this.isRegularSurvey == undefined &&
            this.isInteractiveSurvey == undefined) ||
            (this.isRegularSurvey == false &&
            this.isInteractiveSurvey == false)){
            this.step = 0;
            return;
        }
        if (this.surveyName == null || this.surveyName === "") {
            this.step = 1;
            return;
        }
        if (this.surveyDescription == null || this.surveyDescription === "") {
            this.step = 2;
            return;
        }
        if (this.maxParticipants == null || this.maxParticipants < 1 || this.maxParticipants > 50) {
            this.step = 3;
            return;
        }
        if (this.startTime == undefined || this.endTime == undefined) {
            this.step = 4;
            return;
        }
        if (this.startTime > this.endTime) {
            this.startTime = undefined;
            this.endTime = undefined;
            this.step = 4;
            return;
        }
        if (new Date(this.startTime) < new Date()) {
            this.startTime = undefined;
            this.endTime = undefined;
            this.step = 4;
            return;
        }
        this.step++;
    }

    previousStep() {
        this.step--;
    }

    cancel() {
        this.router.navigate(['']);
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

    addNewQuestion() {
        this.questions.push(new Question(this.indexQuestion++, "", "MULTIPLE", [], [], 1, 600))
    }

    addNewIncorrectAnswer(question: Question) {
        question.incorrect_answers.push("");
    }

    createSurvey() {
        this.clearQuestions();
        const surveyData = {
            title: this.surveyName,
            description: this.surveyDescription,
            date_begin: this.startTime,
            date_end: this.endTime,
            max_students: this.maxParticipants,
            questions: this.questions
        };
        if (!this.user) return;

        this.surveyService.addSurvey(this.user.id, surveyData).subscribe(() => {
            this.router.navigate(['/']);
        }, error => {
            console.error('Error creating survey:', error);
        });
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
                const corAnswer = question.correct_answers[0];
                if (question.correct_answers.length != 1 || this.containsOnlySpaces(corAnswer)) {
                    this.questions.splice(i, 1);
                    continue;
                }

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
        if (timeLimit === 'time_limit_sec') {
            this.questions[i].time_limit_sec = value;
        }
    }

    downloadTemplateExcel() {
        const fileName = 'assets/files/template.xlsx';
        this.downloadFile(fileName);
    }

    private downloadFile(fileName: string): void {
        this.fromBackError = false;
        fetch(fileName)
            .then(response => response.blob())
            .then(blob => {
                const fileParts = fileName.split('/');
                const name = fileParts[fileParts.length - 1];
                saveAs(blob, name);
            })
            .catch(error => {
                console.error('Error downloading file:', error);
            });
    }

    handleDragOver(event: DragEvent) {
        event.preventDefault();
        this.fileGot = false;
        this.fromBackError = false;
    }

    handleDrop(event: DragEvent) {
        event.preventDefault();
        const files = event.dataTransfer!.files;
        this.fileGot = true;
        this.file = files[0];
        this.fromBackError = false;
    }

    onFileSelected($event: Event) {
        if (!this.file) return;
        const file = this.file;
        if (!file.name.endsWith('.xlsx')) return;
        if (!this.user) return;
        this.surveyService.addSurveyExcel(this.user.id, file).subscribe(() => {
            this.router.navigate(['/']);
        }, error => {
            if (error.error.code == "INVALID_EXCEL_FORMAT") {
                console.error('Error parsing survey from excel:', error);
                this.fromBackError = true;
                this.fileGot = false;
                this.file?.slice(this.file?.size + 1);
            } else {
                this.fromBackError = false;
            }
        });
    }

    RegularSurvey() {
        this.isRegularSurvey = true;
        this.isInteractiveSurvey = false;
        this.nextStep();
    }

    InteractiveSurvey() {
        this.isInteractiveSurvey = true;
        this.isRegularSurvey = false;
        this.nextStep();
    }
}
