import { Component } from '@angular/core';

@Component({
  selector: 'app-register-wizard',
  templateUrl: './register-wizard.component.html',
  styleUrls: ['./register-wizard.component.scss']
})
export class RegisterWizardComponent {
  isStepOneComplete: boolean = false;
  
  confirmEmail(): void {

  }

  completeStepOne() {
    this.isStepOneComplete = true;
  }
}
