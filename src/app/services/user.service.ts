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

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:8080/api/professor';

  getUserByEmail(username: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/by_email/${username}`, httpOptions);
  }
}
