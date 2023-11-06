import { Component } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { AuthService } from 'src/app/services/firebase-auth.service';


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

  isDisabled = true;

  constructor(private sharedService: SharedService, private authService: AuthService) {}

  ngOnInit() {
    if (this.sharedService.getJustLoggedIn() || this.sharedService.getJustRegistered()) {
        this.sharedService.setJustLoggedIn(false);
        this.sharedService.setJustRegistered(false);
        window.location.reload();
    }

    this.fetchUserData();
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
          this.determineNextUserLevel();
          console.log(this.userName + this.userLevel + this.userExComplete + this.timeSpentLearning);
        }
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
      }
    });
  }
}
