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

    deleteSurvey(professorId: number, surveyId: number): Observable<Survey> {
        return this.http.delete<Survey>(`${this.baseUrl}/${professorId}/${surveyId}/delete`, httpOptions);
    }

    startSurvey(professorId: number, surveyId: number): Observable<Survey> {
        return this.http.put<Survey>(`${this.baseUrl}/${professorId}/${surveyId}/start`, httpOptions);
    }

    stopSurvey(professorId: number, surveyId: number): Observable<Survey> {
        return this.http.put<Survey>(`${this.baseUrl}/${professorId}/${surveyId}/stop`, httpOptions);
    }
}
