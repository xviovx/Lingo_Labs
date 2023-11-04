import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LevelLensService {
  private apiUrl = 'https://level-lens-15580084405a.herokuapp.com/predict';

  constructor(private http: HttpClient) { }

  analyzeText(text: string): Observable<any> {
    return this.http.post(this.apiUrl, { text })
  }
}
