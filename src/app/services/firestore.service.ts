import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserInfo } from '../models/user-info.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
    constructor(private firestore: AngularFirestore) {}

    getUserInfo(userId: string) {
      return this.firestore.collection('user_info').doc(userId).valueChanges();
    }

    setUserInfo(userId: string, userInfo: UserInfo) {
      return this.firestore.collection('user_info').doc(userId).set(userInfo);
    }

    updateUserInfo(userId: string, partialInfo: Partial<UserInfo>) {
      return this.firestore.collection('user_info').doc(userId).update(partialInfo);
    }

    // In FirestoreService

    updateLevelProgress(userId: string, newProgress: number) {
      return this.firestore.collection('user_info').doc(userId).update({ level_progress: newProgress });
    }

}
