import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/firebase-auth.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router, private sharedService: SharedService) {}

  register(email: string, password: string, confirmPassword: string): void {
    if(password !== confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    } else {
      this.sharedService.setTempCredentials(email, password);
      console.log("Registration initiated");
      this.errorMessage = null;
      this.router.navigate(['register-wizard'])
    }
  }
}
