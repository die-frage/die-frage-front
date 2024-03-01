import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderUnauthorisedComponent } from './header-unauthorised/header-unauthorised.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderUnauthorisedComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
