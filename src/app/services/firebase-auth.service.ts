import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  async signUp(email: string, password: string) {
    const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);
    const uid = credential.user?.uid;
    return this.db.collection('users').doc(uid).set({ email });
  }

  async login(email: string, password: string) { 
    const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
    return userCredential; 
  }

  async signOut() {
    await this.afAuth.signOut();
  }

  async getCurrentUserEmail(): Promise<string | null> {
    const user = await this.afAuth.currentUser;
    return user?.email || null;
  }  

  getCurrentUserId(): Observable<string | null> {
    return new Observable<string | null>(observer => {
      this.afAuth.onAuthStateChanged(user => {
        if (user) {
          observer.next(user.uid);
        } else {
          observer.next(null);
        }
        observer.complete();
      });
    });
  }

  getUserInfo(userId: string): Observable<any> {
    console.log("Fetching user info for userId:", userId);
    return this.db.collection('users').doc(userId).valueChanges().pipe(
      switchMap(data => {
        if (data) {
          console.log("User info fetched for userId:", userId, data);
          return of(data);
        } else {
          console.log("No user data found for userId:", userId);
          return of(null);
        }
      })
    );
  }

  fetchCurrentUserData(): Observable<any> {
    return this.getCurrentUserId().pipe(
      switchMap(userId => {
        if (userId) {
          console.log("Current user ID obtained:", userId);
          return this.getUserInfo(userId);
        } else {
          console.log("No current user ID found");
          return of(null);
        }
      })
    );
  }

  signInWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    return this.afAuth.signInWithPopup(provider)
      .then(res => {
        console.log('Google Sign-In successful!', res);
      })
      .catch(err => {
        alert(err.message);
      });
  }

  public getAuthState() {
    return this.afAuth.authState;
  }
}
