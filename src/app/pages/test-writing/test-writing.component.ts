import { Component } from '@angular/core';
import { LevelLensService } from 'src/app/services/level-lens.service';

@Component({
  selector: 'app-test-writing',
  templateUrl: './test-writing.component.html',
  styleUrls: ['./test-writing.component.css']
})
export class TestWritingComponent {
  userInput: string = ''
  writingLevel: string = '';

  constructor(private ll_service: LevelLensService) {}

  onSubmit(text: string): void {
    this.ll_service.analyzeText(text).subscribe({
      next: (response) => {
        this.writingLevel = response.cefr_level;
        console.log("determined English level is: " + this.writingLevel)
      },
      error: (err) => {
        console.log('api call failed', err)
      }
    });
  }
}
