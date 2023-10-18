import { Injectable } from '@angular/core';
import { Router, CanActivate, CanDeactivate } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanDeactivate<any> {
  constructor(private router: Router, private afAuth: AngularFireAuth) {}

  canActivate() {
    return this.afAuth.authState.pipe(
      map(user => {
        if (user) return true;
        this.router.navigate(['/login']);
        return false;
      })
    );
  }

  canDeactivate() {
    return this.afAuth.authState.pipe(
      map(user => {
        if (!user) return true;
        this.router.navigate(['/home']);
        return false;
      })
    );
  }
}
