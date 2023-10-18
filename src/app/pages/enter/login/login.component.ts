import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/firebase-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
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
      .catch(error => console.error('Login error', error));
  }
}
