import { Component, OnInit } from '@angular/core';
import { OpenaiService } from 'src/app/openai.service';
import { ChangeDetectorRef } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
  animations: [
    trigger('messageAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-100%)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'none' })),
      ]),
    ]),
  ]
})

export class ChatbotComponent implements OnInit {
  mode: 'formal' | 'playful' = 'formal';
  loading: boolean = false;
  userInput: string = '';
  userLevel: string = 'A2';
  botMessages: { content: string, timestamp: number, type: string }[] = [
    { content: 'Hello! I am your English tutor, Polly. How may I assist you today?', timestamp: Date.now(), type: 'bot' }
  ];
  userMessages: { content: string, timestamp: number, type: string }[] = [];
  starActive = false;
  characterCount: number = 0;

  constructor(
    private openaiService: OpenaiService,
    private cdRef: ChangeDetectorRef
  ) { }

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
    this.loading = true;
    const chatContainer = document.querySelector('.chat-container');
    if (chatContainer) chatContainer.classList.add('loading');

    this.openaiService.getCompletionWithLevel(userInput, this.userLevel).subscribe(
      response => {
        this.loading = false;
        if (chatContainer) chatContainer.classList.remove('loading');
        const newBotMessage = response.completion;
        this.botMessages.push({ content: newBotMessage, timestamp: Date.now(), type: 'bot' });

        this.cdRef.detectChanges();
        this.scrollToBottom();
      },
      error => {
        this.loading = false;
        if (chatContainer) chatContainer.classList.remove('loading');
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

      setTimeout(() => {
        this.fetchCompletion(userMessage);
      }, 1000);
    }
  }

  get sortedMessages() {
    return [...this.botMessages, ...this.userMessages]
      .sort((a, b) => a.timestamp - b.timestamp);
  }

  onRowClick(): void {
    console.log("clicked")
  }

  handleModeChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.mode = input.value === '1' ? 'formal' : 'playful';
    this.openaiService.changeMode(this.mode).subscribe(
      response => {
        console.log('Mode changed successfully', response);
      },
      error => {
        console.error('Error changing mode:', error);
      }
    );
  }
  

}
