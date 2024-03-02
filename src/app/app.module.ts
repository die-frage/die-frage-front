import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

import { HeaderUnauthorisedComponent } from './header-unauthorised/header-unauthorised.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthPageComponent } from './auth-page/auth-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderUnauthorisedComponent,
    RegisterPageComponent,
    AuthPageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
