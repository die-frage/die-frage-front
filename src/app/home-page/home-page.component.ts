import { Component } from '@angular/core';
import {TokenStorageService} from "../auth/token-storage.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  // info: any;

  constructor(private token: TokenStorageService) {

  }

  ngOnInit(){
    // this.info = {
    //   username: this.token.getUserName(),
    //   token: this.token.getToken()
    // }
  }

  onClickAddSurvey() {
    console.log("clicked")
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.key === "Enter") {
      const inputValue = (event.target as HTMLInputElement).value;
      // Pass inputValue to your function for further processing
      console.log("Entered value:", inputValue);
    }
  }




}
