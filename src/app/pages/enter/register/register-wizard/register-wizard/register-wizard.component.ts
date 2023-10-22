import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/firebase-auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UserInfo } from '../../../../../models/user-info.model';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-wizard',
  templateUrl: './register-wizard.component.html',
  styleUrls: ['./register-wizard.component.scss']
})
export class RegisterWizardComponent {
  userName: string = '';
  userEmail: string = '';
  userLocation: string = '';
  verificationCode: string = '';

  isStepOneComplete: boolean = false;
  isValidationError: boolean = false;

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private sharedService: SharedService,
    private router: Router
  ) { this.userEmail = this.sharedService.getEmail() }

  async saveUserInfo(name: string, location: string) {
    // get UID
    const userId = await this.authService.getCurrentUserId();

    if (!userId) {
        console.error('No user ID found.');
        return;
    }

    // structure data
    const userInfo: UserInfo = {
        email: this.userEmail,
        name: name,
        location: location,
        current_streak: 0,
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
  async confirmEmail(): Promise<void> {
    if (this.verificationCode === '123456') {
      this.isValidationError = false
      const {email, password} = this.sharedService.getTempCredentials();

      try {
        await this.authService.signUp(email, password);
        console.log('User registration complete.');
        await this.saveUserInfo(this.userName, this.userLocation);
        this.router.navigate(['home'])
      } catch (error) {
        console.error('A registration error occurred: ', error);
        this.isValidationError = true;
      }
    } else {
      this.isValidationError = true;
    }
  }
}
