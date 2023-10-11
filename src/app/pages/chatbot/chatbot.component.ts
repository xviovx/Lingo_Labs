import { Component, OnInit } from '@angular/core';
import { OpenaiService } from 'src/app/openai.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {
  userInput: string = '';
  botMessages: string[] = [];
  userMessages: string[] = [];

  constructor(private openaiService: OpenaiService) { }

  fetchCompletion(userInput: string): void {
    this.openaiService.getCompletion(userInput).subscribe(
      response => {
        const newBotMessage = response.completion;
        this.botMessages.push(newBotMessage);
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  starActive = false;
  characterCount: number = 0;

  ngOnInit(): void {
    this.starActive = localStorage.getItem('starActive') === 'true';
    this.updateStarColor();
  }

  toggleStar(): void {
    this.starActive = !this.starActive;
    localStorage.setItem('starActive', this.starActive.toString());
    const starElement = document.querySelector('.star-icon mat-icon') as HTMLElement;
    if (starElement) {
      starElement.style.color = this.starActive ? '#0093FF' : 'initial';
    }
  }

  updateStarColor(): void {
    const starElement = document.querySelector('.star-icon mat-icon') as HTMLElement;
    if (starElement) {
      starElement.style.color = this.starActive ? '#0093FF' : 'initial';
    }
  }

  updateCharacterCount(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.characterCount = inputElement.value.length;
    const charCountElement = document.getElementById('char-count');
    if (charCountElement) {
      charCountElement.innerText = `${this.characterCount} / 1000`;
    }
  }

  onRowClick(): void {
    console.log('Row clicked');
  }

  sendMessage(): void {
    this.fetchCompletion(this.userInput);
    const userMessage = this.userInput;
    if (userMessage) {
      this.userMessages.push(userMessage); 
      this.userInput = ''; 
    }
  }
  
}
