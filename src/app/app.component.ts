import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { AuthService } from './services/firebase-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
    isLoginPage(): boolean {
        return this.router.url === '/login';
      }
  
      isRegisterPage(): boolean {
        return this.router.url === '/register';
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
                return 'Chat with our Bot!';
            default:
                return '';
        }
    }

    sidenavHovered = false;

    onSidenavHover(hovered: boolean) {
        this.sidenavHovered = hovered;
    }

    title = 'Lingo_Labs';

    @ViewChild(MatSidenav)
    sidenav!: MatSidenav;

    constructor(
      public observer: BreakpointObserver,
      public router: Router,
      private authService: AuthService,
  ) {}

    ngAfterViewInit() {
        this.observer.observe(['(max-width:800px)']).subscribe((res) => {
            if (res.matches) {
                this.sidenav.mode = 'over';
                this.sidenav.close();
            } else {
                this.sidenav.mode = 'side';
                this.sidenav.open();
            }
        });
    }

    signOut() {
        const userEmail = this.authService.getCurrentUserEmail();
        if (userEmail) {
            this.authService.signOut();
            console.log("Successfully signed out user:", userEmail);
        } else {
            console.log("No user is signed in.");
        }
    }
    
}
