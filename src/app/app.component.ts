import { Component, ViewChild, AfterViewInit, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/firebase-auth.service';
import { filter } from 'rxjs/operators';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(
    public observer: BreakpointObserver,
    public router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private sharedService: SharedService
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.toggleSidenav();
    });
  }

  ngOnInit() {
    this.toggleSidenav();
  }

  ngAfterViewInit() {
    this.observer.observe(['(max-width:800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
      this.cdr.detectChanges();
    });
  }

  toggleSidenav() {
    const openRoutes = ['/home', '/stats', '/chatbot', '/book-lesson', '/past-exercises'];
    if (openRoutes.includes(this.router.url) && !this.isLoginPage() && !this.isRegisterPage()) {
        this.sidenav.open();
    } else {
        this.sidenav.close();
    }
  }

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  isRegisterPage(): boolean {
    return this.router.url === '/register';
  }

  isRegisterWizardPage(): boolean {
    return this.router.url === '/register-wizard';
  }

  getGreeting(): string {
    switch (this.router.url) {
        case '/home':
            return 'Welcome, Gringo! 👋🏻';
        case '/past-exercises':
            return 'View your Past Exercises here!';
        case '/book-lesson':
            return 'Ready to book a new Lesson?';
        case '/stats':
            return 'Check out your Stats!';
        case '/chatbot':
            return 'Chat with Polly, the English tutor!';
        default:
            return '';
    }
  }

  sidenavHovered = false;

  onSidenavHover(hovered: boolean) {
    this.sidenavHovered = hovered;
  }

  title = 'Lingo_Labs';

  signOut() {
    const userEmail = this.authService.getCurrentUserEmail();
    if (userEmail) {
        this.authService.signOut().then(() => {
          console.log("Successfully signed out user:", userEmail);
          this.router.navigate(['/login']);
        });
    } else {
        console.log("No user is signed in.");
    }
  }
}
