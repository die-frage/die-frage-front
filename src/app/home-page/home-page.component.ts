import {Component} from '@angular/core';
import {TokenStorageService} from "../auth/token-storage.service";
import {Survey} from "../entities/survey";
import {SurveyService} from "../services/survey.service";
import {User} from "../entities/user";
import {UserService} from "../services/user.service";
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  info: any;
  user: User | undefined;
  surveys: Survey[] | undefined;
  surveysFilter: Survey[] | undefined;
  surveysAll: Survey[] | undefined;

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
    if (this.user) this.surveysAll = await this.getAllSurveys(this.user);
    this.surveys = this.surveysAll;
  }

  async getAllSurveys(user: User): Promise<Survey[] | undefined> {
    try {
      return await this.surveyService.getAllSurveysByProfessorId(user.id).toPromise();
    } catch (error) {
      console.log('Error fetching surveys:', error);
      return undefined;
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      const urlEmail = email.replace(/@/g, '%40');
      return await this.userService.getUserByEmail(urlEmail).toPromise();
    } catch (error) {
      console.log('Error fetching user:', error);
      return undefined;
    }
  }

  onClickChangeSurvey(survey: Survey) {
    const navigationExtras: NavigationExtras = {
      state: {
        survey: survey
      }
    };
    this.router.navigate(['/edit-survey'], navigationExtras);
  }

  onClickAddSurvey() {
    this.router.navigate(['/add-survey']);
  }

  handleKeyPress(event: KeyboardEvent) {
    this.surveysFilter = [];
    if (this.surveysAll == undefined) return;

    if (event.key === "Enter") {
      const inputValue = (event.target as HTMLInputElement).value.toLocaleLowerCase();
      for (let i = 0; i < this.surveysAll.length; i++ ) {
        if (this.surveysAll[i].title.toLocaleLowerCase().includes(inputValue)) {
          this.surveysFilter.push(this.surveysAll[i]);
        }
      }
    }
    this.surveys = this.surveysFilter;
  }

}
