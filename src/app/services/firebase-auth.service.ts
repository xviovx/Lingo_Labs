import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GoogleAuthProvider } from '@angular/fire/auth';

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

  async getCurrentUserId(): Promise<string | null> {
    const user = await this.afAuth.currentUser;
    return user ? user.uid : null;
  }

  async getUserInfo(userId: string): Promise<any> {
    const docSnapshot = await this.db.collection('users').doc(userId).get().toPromise();
    
    if (docSnapshot && docSnapshot.exists) {
        return docSnapshot.data();
    }
    return null;
}

async getCurrentUserInfo(): Promise<any> {
  const userId = await this.getCurrentUserId();
  if (userId) {
      return this.getUserInfo(userId);
  }
  return null;
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

}
