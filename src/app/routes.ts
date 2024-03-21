import { Routes } from "@angular/router";
import { RegisterPageComponent } from "./components/register-page/register-page.component";
import { AuthPageComponent } from "./components/auth-page/auth-page.component";
import {HomePageComponent} from "./components/home-page/home-page.component";
import {authGuard} from "./routing/auth.guard";
import {EditSurveyPageComponent} from "./components/edit-survey-page/edit-survey-page.component";
import {AddSurveyPageComponent} from "./components/add-survey-page/add-survey-page.component";
import {UserPageComponent} from "./components/user-page/user-page.component";
import {SurveyPageComponent} from "./components/survey-page/survey-page.component";
import {AnalyseSurveyPageComponent} from "./components/analyse-survey-page/analyse-survey-page.component";

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
        path: 'user-page',
        component: UserPageComponent,
        canActivate: [authGuard],
        title: 'Die Frage'
    },
    {
        path: '',
        component: HomePageComponent,
        canActivate: [authGuard],
        title: 'Die Frage'
    },
    {
        path: 'survey',
        component: SurveyPageComponent,
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
        // canActivate: [authGuard],
        title: 'Die Frage'
    },
    {
        path: 'analyse-survey',
        component: AnalyseSurveyPageComponent,
        canActivate: [authGuard],
        title: 'Die Frage'
    },
];

export default routeConfig;
