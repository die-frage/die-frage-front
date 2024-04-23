import {Component, OnInit} from '@angular/core';
import {NavigationExtras, Router} from "@angular/router";
import {Survey} from "../../entities/survey";
import {SurveyService} from "../../services/survey.service";
import {User} from "../../entities/user";
import {UserService} from "../../services/user.service";
import {TokenStorageService} from "../../auth/token-storage.service";
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-survey-page',
  templateUrl: './survey-page.component.html',
  styleUrls: ['./survey-page.component.css']
})
export class SurveyPageComponent implements OnInit {
    surveyTitle = "";
    description = "";
    dateBegin = "";
    dateEnd = "";
    maxParticipants = "";
    isFinished = false;
    isStarted = false;

    info: any;
    survey: Survey | undefined;
    user: User | undefined;

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
        this.survey = history.state.survey;
        if (this.survey) {
            this.description = this.survey.description;
            this.dateBegin = this.getFormattedDate(this.survey.date_begin);
            this.dateEnd = this.getFormattedDate(this.survey.date_end);
            this.maxParticipants = this.survey.max_students.toString();
            this.surveyTitle = this.survey.title;
            if (this.survey.status.name === "CREATED_STATUS") {
                this.isStarted = false;
                this.isFinished = false;
            }
            if (this.survey.status.name === "STARTED_STATUS") {
                this.isStarted = true;
                this.isFinished = false;
            }
            if (this.survey.status.name === "FINISHED_STATUS") {
                this.isStarted = true;
                this.isFinished = true;
            }
        }
    }

    async getUserByEmail(email: string): Promise<User | undefined> {
        try {
            const urlEmail = email.replace(/@/g, '%40');
            return await this.userService.getUserByEmail(urlEmail).toPromise();
        } catch (error) {
            console.error('Error getting info user:', error);
            return undefined;
        }
    }

    analyseSurvey() {
        const navigationExtras: NavigationExtras = {
            state: {
                survey: this.survey
            }
        };
        this.router.navigate(['/analyse-survey'], navigationExtras);
    }

    editSurvey() {
        const navigationExtras: NavigationExtras = {
            state: {
                survey: this.survey
            }
        };
        this.router.navigate(['/edit-survey'], navigationExtras);
    }

    stopSurvey() {
        if (this.user && this.survey)
            this.surveyService.stopSurvey(this.user.id, this.survey.id).subscribe(
                (response) => {
                    this.isFinished = true;
                    this.survey = response;
                    this.dateEnd = this.getFormattedDate(this.survey.date_end);
                },
                (error) => {
                    console.error('Error stopping survey:', error);
                }
            );
    }

    startSurvey() {
        if (this.user && this.survey)
            this.surveyService.startSurvey(this.user.id, this.survey.id).subscribe(
                (response) => {
                    this.isStarted = true;
                    this.survey = response;
                    this.dateBegin = this.getFormattedDate(this.survey.date_begin);
                },
                (error) => {
                    console.error('Error starting survey:', error);
                }
            );
    }

    deleteSurvey() {
        if (this.user && this.survey)
            this.surveyService.deleteSurvey(this.user.id, this.survey.id).subscribe(
                (response) => {
                    this.router.navigate([''])
                },
                (error) => {
                    console.error('Error deleting survey:', error);
                }
            );
    }

    getFormattedDate(date: string): string {
        const options: Intl.DateTimeFormatOptions = {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        };

        const parsedDate = new Date(Date.parse(date));
        return parsedDate.toLocaleString('ru-RU', options);
    }

    copyLink() {
        if (this.survey) {
            const el = document.createElement('textarea');
            el.value = this.survey.link;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
        }
    }

    downloadWord(): void {
        const fileName = 'assets/files/word_file.docx';
        this.downloadFile(fileName);
    }

    downloadExcel(): void {
        const fileName = 'assets/files/excel_file.xlsx';
        this.downloadFile(fileName);
    }

    downloadPdf(): void {
        const fileName = 'assets/files/pdf_file.pdf';
        this.downloadFile(fileName);
    }

    private downloadFile(fileName: string): void {
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
}
