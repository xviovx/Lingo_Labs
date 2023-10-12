import { Component, OnInit } from '@angular/core';
import { OpenaiService } from 'src/app/openai.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {
  userInput: string = '';
  botMessages: {content: string, timestamp: number, type: string}[] = [];
  userMessages: {content: string, timestamp: number, type: string}[] = [];
  starActive = false;
  characterCount: number = 0;

  constructor(private openaiService: OpenaiService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.starActive = localStorage.getItem('starActive') === 'true';
    this.updateStarColor();

    document.getElementById('chat-input-field')?.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        this.sendMessage();
      }
    });
  }

  fetchCompletion(userInput: string): void {
    this.openaiService.getCompletion(userInput).subscribe(
      response => {
        const newBotMessage = response.completion;
        this.botMessages.push({ content: newBotMessage, timestamp: Date.now(), type: 'bot' });
        
        this.cdRef.detectChanges();

        this.scrollToBottom();
      },
      error => {
        console.error('Error:', error);
      }
    );
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

  updateCharacterCount(event: Event | KeyboardEvent): void {
    const inputElement = event.target as HTMLInputElement;
    this.characterCount = inputElement.value.length;
    
    const charCountElement = document.getElementById('char-count');
    if (charCountElement) {
      charCountElement.innerText = `${this.characterCount} / 1000`;
    }
    
    if ('key' in event && 'shiftKey' in event) {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        this.sendMessage();
      }
    }
  }

  scrollToBottom(): void {
    const chatHistory = document.querySelector('.chat-history');
    if (chatHistory) {
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }
  }
  
  sendMessage(): void {
    const userMessage = this.userInput;
    if (userMessage) {
      this.userMessages.push({ content: userMessage, timestamp: Date.now(), type: 'user' });
      this.userInput = '';
      this.characterCount = 0;
      const charCountElement = document.getElementById('char-count');
      if (charCountElement) {
        charCountElement.innerText = `${this.characterCount} / 1000`;
      }
      
      this.cdRef.detectChanges();

      this.scrollToBottom();

      this.fetchCompletion(userMessage);
    }
}  

  get sortedMessages() {
    return [...this.botMessages, ...this.userMessages]
      .sort((a, b) => a.timestamp - b.timestamp);
  }

  onRowClick(): void{
    console.log("clicked")
  }
}
