import { Component } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { AuthService } from 'src/app/services/firebase-auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  progressValue = 50;
  userName: string = "";
  userLevel: string = "";
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

  private fetchUserData(): void {
    this.authService.fetchCurrentUserData().subscribe({
      next: (userData) => {
        if (userData) {
          this.userName = userData.name;
          this.userLevel = userData.level;
          this.userExComplete = userData.exercises_complete;
          this.timeSpentLearning = userData.time_learning;
          console.log(this.userName + this.userLevel + this.userExComplete + this.timeSpentLearning);
        }
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
      }
    });
  }
}
