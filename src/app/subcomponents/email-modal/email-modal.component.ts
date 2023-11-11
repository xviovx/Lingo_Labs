import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-email-modal',
  templateUrl: './email-modal.component.html',
  styleUrls: ['./email-modal.component.css']
})
export class EmailModalComponent {
  constructor(public dialogRef: MatDialogRef<EmailModalComponent>) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }  
}
