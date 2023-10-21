import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private email: string = '';
  private justLoggedIn = false;

  setJustLoggedIn(value: boolean) {
    this.justLoggedIn = value;
  }

  getJustLoggedIn(): boolean {
    return this.justLoggedIn;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  getEmail(): string {
    return this.email;
  }
}
