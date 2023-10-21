import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
    constructor(private firestore: AngularFirestore) {}

    getUserInfo(userId: string) {
      return this.firestore.collection('user_info').doc(userId).valueChanges();
    }
  
}
