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

    addSurvey(professorId: number, surveyData: any): Observable<Survey> {
        return this.http.post<Survey>(`${this.baseUrl}/${professorId}/add`, surveyData, httpOptions);
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

    updateSurvey(professorId: number, surveyId: number, surveyData: any): Observable<Survey> {
        return this.http.put<Survey>(`${this.baseUrl}/${professorId}/${surveyId}/update`, surveyData, httpOptions);
    }

    addSurveyExcel(professorId: number, file: File): Observable<Survey> {
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        return this.http.post<Survey>(`${this.baseUrl}/${professorId}/add/excel`, formData);
    }
}
