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

  //TO-DO: utilize firebase cloud functions to check if an email already exists
  register(email: string, password: string, confirmPassword: string): void {
    if(password.length < 6) {
      this.errorMessage = 'Password should be at least 6 characters!';
    }
    else if(password !== confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
    } 
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.errorMessage = 'Invalid email format!';
    }
    else {
      this.sharedService.setTempCredentials(email, password);
      console.log("Registration initiated");
      this.errorMessage = null;
      this.sharedService.setJustRegistered(true);
      this.router.navigate(['register-wizard']);
    }
  }  
}
