import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private email: string = '';
  private justLoggedIn = false;
  private justRegistered = false;
  private tempEmail: string = '';
  private tempPassword: string = '';

  setJustRegistered(value: boolean) {
    this.justRegistered = value;
  }

  getJustRegistered() {
    return this.justRegistered;
  }

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

  setTempCredentials(email: string, password: string): void {
    this.tempEmail = email;
    this.tempPassword = password;
  }

  getTempCredentials(): {email: string, password: string} {
    return { email: this.tempEmail, password: this.tempPassword}
  }
}
