import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Survey} from "../entities/survey";
import {Observable} from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({'Accept': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private baseUrl = 'http://localhost:8080/api/survey';

  constructor(private http: HttpClient) {
  }

  getAllSurveysByProfessorId(professorId: number): Observable<Survey[]> {
    return this.http.get<Survey[]>(`${this.baseUrl}/${professorId}/all`, httpOptions);
  }

  getSurveysByProfessorIdAndName(professorId: number, surveyName: string): Observable<Survey[]> {
    return this.http.get<Survey[]>(`${this.baseUrl}/${professorId}?survey_name=${surveyName}`, httpOptions);
  }
}
