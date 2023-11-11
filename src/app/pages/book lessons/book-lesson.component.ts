import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmailModalComponent } from 'src/app/subcomponents/email-modal/email-modal.component';

@Component({
  selector: 'app-book-lesson',
  templateUrl: './book-lesson.component.html',
  styleUrls: ['./book-lesson.component.css'],
})
export class BookLessonComponent {
  selectedLesson = null;

  constructor(public dialog: MatDialog) {}

  openModal(): void {
    const dialogRef = this.dialog.open(EmailModalComponent, {
      width: '250px'
      // You can also pass data or configure the modal here
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Additional logic after closing the modal, if needed
    });
  }
}

