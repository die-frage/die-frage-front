import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from "rxjs";

import { SignInInfo } from "./responces/SignInInfo";
import { SignUpInfo } from "./responces/SignUpInfo";
import { JwtResponse } from "./responces/JwtResponse";
import {TokenStorageService} from "./token-storage.service";

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private signInUrl = 'http://localhost:8787/auth/sign-in';
    private signUpUrl = 'http://localhost:8787/auth/sign-up';

    signIn(credentials: SignInInfo): Observable<JwtResponse> {
        return this.http.post<JwtResponse>(this.signInUrl, credentials, httpOptions);
    }

    signUp(userData: SignUpInfo): Observable<JwtResponse> {
        return this.http.post<JwtResponse>(this.signUpUrl, userData, httpOptions);
    }

    isAuthenticated(): boolean {
        return !!this.tokenStorageService.getToken();
    }

    constructor(private http: HttpClient,
                private tokenStorageService: TokenStorageService) {
    }
}
