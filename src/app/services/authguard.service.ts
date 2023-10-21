import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private afAuth: AngularFireAuth) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (state.url === '/login' || state.url === '/register' || state.url === '/register-wizard') {
      return this.checkNotAuthState();
    }
    return this.checkAuthState();
  }

  private checkAuthState(): Observable<boolean | UrlTree> {
    return this.afAuth.authState.pipe(
      map(user => {
        if (user) return true;
        return this.router.parseUrl('/login');  // redirect to login if not authenticated
      })
    );
  }

  private checkNotAuthState(): Observable<boolean | UrlTree> {
    return this.afAuth.authState.pipe(
      map(user => {
        if (!user) return true;
        return this.router.parseUrl('/home');  // redirect to home if already authenticated
      })
    );
  }
}
