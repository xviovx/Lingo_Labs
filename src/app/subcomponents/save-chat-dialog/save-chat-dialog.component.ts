import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-save-chat-dialog',
  templateUrl: './save-chat-dialog.component.html',
  styleUrls: ['./save-chat-dialog.component.css']
})
export class SaveChatDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SaveChatDialogComponent>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(title: string): void {
    this.dialogRef.close(title);
  }
}
