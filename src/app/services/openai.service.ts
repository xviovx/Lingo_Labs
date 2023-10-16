import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {
  private serverUrl = 'http://localhost:5000/get-completion';
  private modeChangeUrl = 'http://localhost:5000/change-mode';

  constructor(private http: HttpClient) { }

  getCompletionWithLevel(userInput: string, userLevel: string): Observable<any> {
    return this.http.post<any>(this.serverUrl, { user_input: userInput, user_level: userLevel });
  }

  changeMode(mode: 'formal' | 'playful'): Observable<any> {
    return this.http.post<any>(this.modeChangeUrl, { mode: mode });
  }
}
