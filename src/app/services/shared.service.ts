import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private justLoggedIn = false;

  setJustLoggedIn(value: boolean) {
    this.justLoggedIn = value;
  }

  getJustLoggedIn(): boolean {
    return this.justLoggedIn;
  }
}
