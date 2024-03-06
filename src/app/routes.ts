import { Routes } from "@angular/router";
import { RegisterPageComponent } from "./register-page/register-page.component";
import { AuthPageComponent } from "./auth-page/auth-page.component";
import {HomePageComponent} from "./home-page/home-page.component";

const routeConfig: Routes = [
  {
    path: 'sign-in',
    component: AuthPageComponent,
    title: 'Die Frage'
  },
  {
    path: 'sign-up',
    component: RegisterPageComponent,
    title: 'Die Frage'
  },
  {
    path: '',
    component: HomePageComponent,
    title: 'Die Frage'
  }
];

export default routeConfig;
