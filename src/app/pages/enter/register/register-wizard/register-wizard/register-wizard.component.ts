import { Component } from '@angular/core';
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

  errorMessage: string = '';

  isStepOneComplete: boolean = false;
  isValidationError: boolean = false;

  constructor(
    private sharedService: SharedService,
    private router: Router
  ) {}

  //TO-DO: integrate with back-end
  async confirmEmail(): Promise<void> {
    if (this.verificationCode === '123456') {
      this.isValidationError = false;

      this.sharedService.setUserName(this.userName);
      this.sharedService.setUserLocation(this.userLocation);
      this.sharedService.setEmail(this.userEmail);

      this.router.navigate(['placement-test']);
    
    } else {
      this.isValidationError = true;
      this.errorMessage = "Incorrect pin";
    }
  }
}
