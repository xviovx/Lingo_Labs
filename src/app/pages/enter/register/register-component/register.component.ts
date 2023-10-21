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
    }

    this.authService.signUp(email, password)
      .then(() => {
        console.log('Registration successful!');
        this.errorMessage = null; 
        this.sharedService.setEmail(email);
        this.router.navigate(['registration-wizard']);
      })
      .catch(error => {
        console.error('Registration error:', error);
        this.errorMessage = error.message;
      });
  }
}
