import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private email: string = '';
  private justLoggedIn = false;
  private justRegistered = false;
  private tempEmail: string = '';
  private tempPassword: string = '';
  private userName: string = '';
  private userLocation: string = '';
  private userLevel: string = "";
  private userLevelSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  // Expose the subject as an observable
  userLevel$: Observable<string> = this.userLevelSubject.asObservable();

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

  setUserName(name: string): void {
    this.userName = name;
  }

  getUserName(): string {
    return this.userName;
  }

  setUserLocation(location: string): void {
    this.userLocation = location;
  }

  getUserLocation(): string {
    return this.userLocation;
  }

  setUserLevel(level: string): void {
    this.userLevel = level;
    this.userLevelSubject.next(level); 
  }

  getUserLevel(): string {
    return this.userLevel;
  }
}
