import { Routes } from "@angular/router";
import { RegisterPageComponent } from "./register-page/register-page.component";
import { AuthPageComponent } from "./auth-page/auth-page.component";

const routeConfig: Routes = [
  {
    path: '',
    component: AuthPageComponent,
    title: 'Die Frage'
  },
  {
    path: 'registration',
    component: RegisterPageComponent,
    title: 'Die Frage'
  }
];

export default routeConfig;
