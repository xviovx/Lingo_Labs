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
  userName: string = "";
  userLevel: string = "";
  dataAttempted: boolean = false;
  testWritingSelected: boolean = false;

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
    console.log("app loaded");
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
    this.fetchUserData();
    console.log("fetched username" + this.userName)
  }

  fetchUserData() {
    this.authService.fetchCurrentUserData().subscribe((userData: any) => {
      if (userData) {
        console.log('User Data fetched:', userData);
        this.userName = userData.name;
        this.userLevel = userData.level;
        this.sharedService.setUserLevel(this.userLevel);
        console.log("user level is: " + this.userLevel);
      } else {
        console.log('User Data is null or undefined.');
      }
      this.dataAttempted = true;
    }, (error: any) => {
        console.error('Error fetching user data:', error);
        this.dataAttempted = true;
    });
}

testWriting() {
  this.router.navigate(['/test-writing']);
}

  toggleSidenav() {
    const openRoutes = ['/home', '/stats', '/chatbot', '/book-lesson', '/past-exercises'];
    const closedRoutes = ['/login', '/register', '/register-wizard', '/placement-test'];

    if (openRoutes.includes(this.router.url)) {
        this.sidenav.open();
    } else if (closedRoutes.includes(this.router.url)) {
        this.sidenav.close();
    } else {
        this.sidenav.open();
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

  isPlacementTestPage(): boolean {
    return this.router.url === '/placement-test';
  }

  getGreeting(): string {
    switch (this.router.url) {
        case '/home':
            if (this.dataAttempted && !this.userName) {
                return 'Welcome, Friend!';
            } else if (this.dataAttempted && this.userName) {
                return `Welcome, ${this.userName} 👋🏻!`;
            } else {
                return 'Welcome!';
            }
        case '/past-exercises':
            return 'View your Past Exercises here!';
        case '/book-lesson':
            return 'Ready to book a new Lesson?';
        case '/stats':
            return 'Check out your Stats!';
        case '/chatbot':
            return 'Chat with Polly';
        case '/test-writing':
            return 'Test your writing level!'
        case '/exercise':
              return 'Exercise in progress.'
        case '/**':
            return "Page not found!";
        default:
            return '';
    }
}

getSubtitle(): string {
  switch (this.router.url) {
      case '/home':
          // Return a home-specific subtitle
          return 'Start your learning journey today!';
      case '/past-exercises':
          // Return a past-exercises-specific subtitle
          return 'See how far you’ve come!';
      case '/book-lesson':
          // Return a booking-specific subtitle
          return 'Choose the best time for your next lesson.';
      case '/stats':
          // Return a stats-specific subtitle
          return 'Your progress is just a click away.';
      case '/chatbot':
          // Return a chatbot-specific subtitle
          return 'The English Tutor!';
      case '/test-writing':
          // Return a test-writing-specific subtitle
          return 'Find out your English proficiency level.';
      case '/exercise':
          return 'Take your time.'
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
