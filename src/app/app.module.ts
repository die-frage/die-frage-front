import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

import { HeaderUnauthorisedComponent } from './header/header-unauthorised/header-unauthorised.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import {provideRouter, RouterModule} from "@angular/router";
import routeConfig from "./routes";
import { HeaderAuthorisedComponent } from './header/header-authorised/header-authorised.component';
import { HomeComponent } from './home/home.component';
import { HomePageComponent } from './home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderUnauthorisedComponent,
    RegisterPageComponent,
    AuthPageComponent,
    HeaderAuthorisedComponent,
    HomeComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([])
  ],
  providers: [provideRouter(routeConfig)],
  bootstrap: [AppComponent]
})
export class AppModule { }
