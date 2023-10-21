import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/firebase-auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  errorMessage: string | null = null;

  constructor(private authService: AuthService) {}

  register(email: string, password: string, confirmPassword: string): void {
    if(password !== confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    this.authService.signUp(email, password)
      .then(() => {
        console.log('Registration successful!');
        this.errorMessage = null; 
      })
      .catch(error => {
        console.error('Registration error:', error);
        this.errorMessage = error.message;
      });
  }
}
