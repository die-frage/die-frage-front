import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeaderUnauthorisedComponent } from './header/header-unauthorised/header-unauthorised.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { HeaderAuthorisedComponent } from './header/header-authorised/header-authorised.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HttpClientModule} from "@angular/common/http";

import { provideRouter, RouterModule } from "@angular/router";
import routeConfig from "./routes";
import { httpInterceptorProviders } from "./auth/auth-interceptor";

@NgModule({
  declarations: [
    AppComponent,
    HeaderUnauthorisedComponent,
    RegisterPageComponent,
    AuthPageComponent,
    HeaderAuthorisedComponent,
    HomePageComponent
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
export class AppModule { }
