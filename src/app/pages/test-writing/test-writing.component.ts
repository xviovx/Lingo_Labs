import { Component } from '@angular/core';
import { LevelLensService } from 'src/app/services/level-lens.service';

@Component({
  selector: 'app-test-writing',
  templateUrl: './test-writing.component.html',
  styleUrls: ['./test-writing.component.css']
})
export class TestWritingComponent {
  userInput: string = '';
  writingLevel: string = '';
  hasSubmitted: boolean = false;
  showLoader: boolean = false;
  questions: string[] = [
    'Who is your favorite person to spend time with and why?',
    'Describe your most memorable holiday experience.',
    'What are the benefits of learning a new language?',
    'How does social media affect personal relationships?',
    'What book has influenced you the most?',
    'Explain the impact of technology on education.',
    'Discuss the importance of environmental conservation.',
    'What are the qualities of a good leader?',
    'How can we solve the problem of traffic congestion in cities?',
    'What role do hobbies play in our lives?',
    'Discuss the pros and cons of remote work.',
    'Explain how traveling can broaden your perspective.',
    'What measures should be taken to reduce unemployment?',
    'How can society support mental health awareness?',
    'What are the advantages of adopting a pet?',
    'Discuss the significance of cultural heritage.',
    'How does music influence our mood and emotions?',
    'What steps can individuals take to reduce their carbon footprint?',
    'Explain the importance of financial literacy.',
    'What impact has the internet had on modern communication?'
  ];
  currentQuestion: string = this.getRandomQuestion();

  constructor(private ll_service: LevelLensService) {}

  getRandomQuestion(): string {
    const randomIndex = Math.floor(Math.random() * this.questions.length);
    return this.questions[randomIndex];
  }

  changeQuestion(): void {
    this.currentQuestion = this.getRandomQuestion();
  }

  onSubmit(text: string): void {
    this.showLoader = true;
    this.hasSubmitted = false;
    this.ll_service.analyzeText(text).subscribe({
      next: (response) => {
        this.writingLevel = response.cefr_level;
        setTimeout(() => {
          this.showLoader = false;
          this.hasSubmitted = true;
        }, 2000)
      },
      error: (err) => {
        console.log('api call failed', err);
        this.showLoader = false;
        this.hasSubmitted = false;
      }
    });
  }
}
