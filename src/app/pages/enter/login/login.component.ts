import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/firebase-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  errorMessage: string | null = null; 

  constructor(private auth: AuthService, private router: Router) {}

  login(email: string, password: string): void {
    this.auth.login(email, password)
      .then(userCredential => {
        if (userCredential.user) {
          console.log(userCredential.user.email);
          this.router.navigate(['/home']);
        } else {
          console.error('No user found');
        }
      })
      .catch(error => {
        console.error('Login error', error);
        switch (error.code) {
          case 'auth/invalid-email':
            this.errorMessage = 'Invalid email address';
            break;
          case 'auth/user-not-found':
            this.errorMessage = 'No user found with this email';
            break;
          case 'auth/wrong-password':
            this.errorMessage = 'Incorrect password';
            break;
          case 'auth/invalid-login-credentials':
            this.errorMessage = 'Invalid credentials';
            break;
          default:
            this.errorMessage = "Invalid";
        }
      });
  }
}
