import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  
  sidenavHovered = false;

  onSidenavHover(hovered: boolean) {
    this.sidenavHovered = hovered;
  }

  title = 'Lingo_Labs';

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(
    public observer: BreakpointObserver,
    public router: Router
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
}
