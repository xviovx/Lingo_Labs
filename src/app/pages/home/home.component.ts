import { Component } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { AuthService } from 'src/app/services/firebase-auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { UserInfo } from 'src/app/models/user-info.model';
import { DocumentData } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  progressValue = 0;
  userName: string = "";
  userLevel: string = "";
  nextUserLevel: string = "";
  userExComplete: string = "";
  timeSpentLearning: string = "";

  userId: string = "";

  isDisabled = true;

  constructor(private sharedService: SharedService, private authService: AuthService, private firestoreService: FirestoreService) {}

  ngOnInit() {
    if (this.sharedService.getJustLoggedIn() || this.sharedService.getJustRegistered()) {
        this.sharedService.setJustLoggedIn(false);
        this.sharedService.setJustRegistered(false);
        window.location.reload();
    }

    this.fetchUserData();
  } 

  fetchUserLevelProgress() {
    this.firestoreService.getUserInfo(this.userId).subscribe((data: DocumentData | undefined) => {
      if (data) {
        const userInfo: UserInfo = data as UserInfo; 
        this.progressValue = userInfo.level_progress;
        console.log(this.progressValue);
      }
    },
    error => {
      console.error('Error fetching user info:', error);
    });
  }

  private determineNextUserLevel(): void {
    if (this.userLevel === "A1"){
      this.nextUserLevel = 'A2';
    } else if (this.userLevel === "A2"){
      this.nextUserLevel = 'B1';
    } else if (this.userLevel === 'B1'){
      this.nextUserLevel = 'B2';
    } else if (this.userLevel === 'B2'){
      this.nextUserLevel = 'C1';
    } else if (this.userLevel === 'C1'){
      this.nextUserLevel = 'C2';
    } else if (this.userLevel === 'C2'){
      this.nextUserLevel = 'Max';
    }
  }

  private fetchUserData(): void {
    this.authService.fetchCurrentUserData().subscribe({
      next: (userData) => {
        if (userData) {
          this.userName = userData.name;
          this.userLevel = userData.level;
          this.userExComplete = userData.exercises_complete;
          this.timeSpentLearning = userData.time_learning;
          this.progressValue = userData.level_progress;
          this.determineNextUserLevel();
          console.log(this.userName + this.userLevel + this.userExComplete + this.timeSpentLearning);
        }
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
      }
    });
  }

  //provisions for portfolio (delete later)
  getUnitText(): string {
    return this.progressValue === 10 ? 'Book 1, Step 1, Unit 1.2' : 'Book 1, Step 1, Unit 1.1';
  }

  getUnitTextTwo(): string {
    return this.progressValue === 10 ? 'Book 1, Step 1, Unit 1.3' : 'Book 1, Step 1, Unit 1.2';
  }

  getUnitTextThree(): string {
    return this.progressValue === 10 ? '1' : '0';
  }

  getUnitTextFour(): string {
    return this.progressValue === 10 ? '0.1' : '0';
  }

  getProgressBarWidth(): string {
    return this.progressValue === 10 ? '40%' : '20%';
  }

  getProgressPercentage(): string {
    return this.progressValue === 10 ? '40%' : '20%';
  }
}
