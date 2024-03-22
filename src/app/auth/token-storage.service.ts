import { Injectable } from '@angular/core';

const TOKEN_KEY = "TOKEN_KEY";
const EMAIL_KEY = "EMAIL_KEY";

@Injectable({
    providedIn: 'root'
})
export class TokenStorageService {
    signOut() {
        window.sessionStorage.clear();
    }

    public saveToken(token: string) {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);
    }

    public saveEmail(email: string) {
        window.sessionStorage.removeItem(EMAIL_KEY);
        window.sessionStorage.setItem(EMAIL_KEY, email);
    }

    public getToken(): string {
        return <string>sessionStorage.getItem(TOKEN_KEY);
    }

    public getUserName(): string {
        return <string>sessionStorage.getItem(EMAIL_KEY);
    }

    constructor() {
    }
}
