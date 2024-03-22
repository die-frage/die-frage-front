import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../entities/user";

const httpOptions = {
    headers: new HttpHeaders({'Accept': 'application/json'})
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private baseUrl = 'http://localhost:8080/api/professor';

    constructor(private http: HttpClient) {
    }

    getUserByEmail(username: string): Observable<User> {
        return this.http.get<User>(`${this.baseUrl}/by_email/${username}`, httpOptions);
    }

    updateProfessor(professorId: number, updatedData: { firstName: string, lastName: string, patronymic: string, email: string, password: string }): Observable<User> {
        const {firstName, lastName, patronymic, email, password} = updatedData;
        const queryParams = `?firstName=${firstName}&lastName=${lastName}&patronymic=${patronymic}&email=${email}&password=${password}`;
        return this.http.put<User>(`${this.baseUrl}/credentials/${professorId}${queryParams}`, null, httpOptions);
    }

}
