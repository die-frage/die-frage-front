import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideRouter, RouterModule } from "@angular/router";
import routeConfig from "./routes";
import { httpInterceptorProviders } from "./auth/auth-interceptor";

import { EditSurveyPageComponent } from './components/edit-survey-page/edit-survey-page.component';
import { AddSurveyPageComponent } from './components/add-survey-page/add-survey-page.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { SurveyPageComponent } from './components/survey-page/survey-page.component';
import { AnalyseSurveyPageComponent } from './components/analyse-survey-page/analyse-survey-page.component';
import { HeaderUnauthorisedComponent } from './components/header/header-unauthorised/header-unauthorised.component';
import { HeaderAuthorisedComponent } from './components/header/header-authorised/header-authorised.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { AuthPageComponent } from './components/auth-page/auth-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HttpClientModule} from "@angular/common/http";

@NgModule({
    declarations: [
        AppComponent,
        HeaderUnauthorisedComponent,
        RegisterPageComponent,
        AuthPageComponent,
        HeaderAuthorisedComponent,
        HomePageComponent,
        EditSurveyPageComponent,
        AddSurveyPageComponent,
        UserPageComponent,
        SurveyPageComponent,
        AnalyseSurveyPageComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot([])
    ],
    providers: [
        httpInterceptorProviders,
        provideRouter(routeConfig)
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
