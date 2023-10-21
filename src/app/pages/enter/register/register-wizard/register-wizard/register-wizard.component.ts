import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/firebase-auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UserInfo } from '../../../../../models/user-info.model';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-register-wizard',
  templateUrl: './register-wizard.component.html',
  styleUrls: ['./register-wizard.component.scss']
})
export class RegisterWizardComponent {
  isStepOneComplete: boolean = false;
  validationPin: string = '';
  isValidationError: boolean = false;

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService
  ) { }

  async saveUserInfo(name: string, location: string) {
    // get UID
    const userId = await this.authService.getCurrentUserId();

    if (!userId) {
        console.error('No user ID found.');
        return;
    }

    // structure data
    const userInfo: UserInfo = {
        name: name,
        location: location,
        current_streak: 0,
        date_joined: firebase.firestore.Timestamp.now(),
        exercises_complete: 0,
        level: "", 
        live_sessions: 0,
        longest_streak: 0,
        messages_sent: 0,
        time_in_chat: 0,
        time_learning: 0
    };

    // save to firestore
    try {
        await this.firestoreService.setUserInfo(userId, userInfo);
        console.log('User info saved successfully.');
    } catch (error) {
        console.error('Error saving user info:', error);
    }
}

  //TO-DO: integrate with back-end
  confirmEmail(): void {
    if(this.validationPin === '123456') {
      this.isValidationError = false;
    } else {
      this.isValidationError = true;
    }
  }
}
