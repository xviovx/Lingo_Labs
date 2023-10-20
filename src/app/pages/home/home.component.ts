import { Component } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { SharedService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  progressValue = 50;

  isDisabled = true;

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    if (this.sharedService.getJustLoggedIn()) {
      this.sharedService.setJustLoggedIn(false);
      window.location.reload();
    }
  }  
}
