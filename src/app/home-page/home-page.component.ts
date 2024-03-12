import {Component} from '@angular/core';
import {TokenStorageService} from "../auth/token-storage.service";
import {Survey} from "../entities/survey";
import {SurveyService} from "../services/survey.service";
import {User} from "../entities/user";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  info: any;
  user: User | undefined;
  surveys: Survey[] | undefined;

  constructor(private token: TokenStorageService,
              private userService: UserService,
              private surveyService: SurveyService) {
  }

  async ngOnInit() {
    this.info = {
      username: this.token.getUserName(),
      token: this.token.getToken()
    };
    this.user = await this.getUserByEmail(this.info.username);
    if (this.user) this.surveys = await this.getAllSurveys(this.user);
    console.log(this.surveys);
  }

  onClickAddSurvey() {
    console.log("clicked");
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.key === "Enter") {
      const inputValue = (event.target as HTMLInputElement).value;
      console.log("Entered value:", inputValue);
    }
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

}
