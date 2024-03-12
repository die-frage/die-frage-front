import { Component } from '@angular/core';
import {User} from "../entities/user";
import {TokenStorageService} from "../auth/token-storage.service";
import {UserService} from "../services/user.service";
import {SurveyService} from "../services/survey.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-survey-page',
  templateUrl: './add-survey-page.component.html',
  styleUrls: ['./add-survey-page.component.css']
})
export class AddSurveyPageComponent {
  info: any;
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
