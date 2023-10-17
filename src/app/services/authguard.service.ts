import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private router: Router, private afAuth: AngularFireAuth) {}

  static canActivate() {
    const authGuard = inject(AuthGuard);
    return authGuard.checkAuthState();
  }

  static canDeactivate() {
    const authGuard = inject(AuthGuard);
    return authGuard.checkNotAuthState();
  }

  checkAuthState() {
    return this.afAuth.authState.pipe(
      map(user => {
        if (user) return true;
        this.router.navigate(['/login']);
        return false;
      })
    );
  }

  checkNotAuthState() {
    return this.afAuth.authState.pipe(
      map(user => {
        if (!user) return true;
        this.router.navigate(['/home']);
        return false;
      })
    );
  }
}