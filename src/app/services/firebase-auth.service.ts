import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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

}
