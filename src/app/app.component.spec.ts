import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {AuthService} from "./auth/auth.service";
import {HeaderUnauthorisedComponent} from "./components/header/header-unauthorised/header-unauthorised.component";


describe('AppComponent', () => {
    beforeEach(() => TestBed.configureTestingModule({
        declarations: [AppComponent, HeaderUnauthorisedComponent],
        imports: [
            HttpClientModule,
            RouterTestingModule
        ],
        providers: [AuthService]
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have as title 'die Frage'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual('die Frage');
    });

});
