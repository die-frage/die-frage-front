import { Routes } from "@angular/router";
import { RegisterPageComponent } from "./register-page/register-page.component";
import { AuthPageComponent } from "./auth-page/auth-page.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {authGuard} from "./routing/auth.guard";
import {EditSurveyPageComponent} from "./edit-survey-page/edit-survey-page.component";
import {AddSurveyPageComponent} from "./add-survey-page/add-survey-page.component";
import {UserPageComponent} from "./user-page/user-page.component";

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
        canActivate: [authGuard],
        title: 'Die Frage'
    },
    {
        path: 'edit-survey',
        component: EditSurveyPageComponent,
        canActivate: [authGuard],
        title: 'Die Frage'
    },
    {
        path: 'add-survey',
        component: AddSurveyPageComponent,
        canActivate: [authGuard],
        title: 'Die Frage'
    },
    {
        path: 'user-page',
        component: UserPageComponent,
        canActivate: [authGuard],
        title: 'Die Frage'
    }

];

export default routeConfig;
