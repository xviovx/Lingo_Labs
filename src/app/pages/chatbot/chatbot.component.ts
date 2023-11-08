import { AfterViewInit, Component, OnInit } from '@angular/core';
import { OpenaiService } from '../../services/openai.service';
import { ChangeDetectorRef } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { SharedService } from 'src/app/services/shared.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AuthService } from 'src/app/services/firebase-auth.service';
import { Message } from 'src/app/models/message.model';

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

export class ChatbotComponent implements OnInit, AfterViewInit {
  mode: 'formal' | 'playful' = 'formal';
  loading: boolean = false;
  userInput: string = '';
  userLevel: string = '';
  botMessages: Message[]= [
    { content: 'Hello! I am your English tutor, Polly. How may I assist you today?', timestamp: Date.now(), type: 'bot' }
  ];
  userMessages: Message[] = [];
  starActive = false;
  characterCount: number = 0;
  starredResponse: Message[] = [];

  constructor(
    private openaiService: OpenaiService,
    private cdRef: ChangeDetectorRef,
    private sharedService: SharedService,
    private firestoreService: FirestoreService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.starActive = localStorage.getItem('starActive') === 'true';
    this.updateStarColor();
    this.loadMessages();

    document.getElementById('chat-input-field')?.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        this.sendMessage();
      }
    });

    this.sharedService.userLevel$.subscribe(level => {
      this.userLevel = level;
      console.log('User level in ChatbotComponent:', this.userLevel);
    });

  }

  ngAfterViewInit(): void {
    this.updateStarColor();
  }

  loadMessages(): void {
    const storedBotMessages = JSON.parse(localStorage.getItem('botMessages') || '[]');
    if (storedBotMessages.length === 0) {
      this.botMessages = this.mode === 'formal'
        ? [{ content: 'Hello! I am your English tutor, Polly. How may I assist you today?', timestamp: Date.now(), type: 'bot' }]
        : [{ content: "Hiya! I'm Polly, your English buddy! What are we learning today? 😊", timestamp: Date.now(), type: 'bot' }];
    } else {
      this.botMessages = storedBotMessages;
    }
  
    this.userMessages = JSON.parse(localStorage.getItem('userMessages') || '[]');
    this.starActive = localStorage.getItem('starActive') === 'true';
    this.updateStarColor();

    setTimeout(() => this.scrollToBottom(), 0)
  }

  updateLocalStorageStarred(messageToToggle: Message): void {
    const starredMessages = this.sortedMessages.filter(m => m.starred);
    localStorage.setItem('starredMessages', JSON.stringify(starredMessages));
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
  
        // save msg to local storage 
        localStorage.setItem('botMessages', JSON.stringify(this.botMessages));
  
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

  toggleStar(messageToToggle: Message): void {
    messageToToggle.starred = !messageToToggle.starred;
  
    localStorage.setItem(`star_${messageToToggle.timestamp}`, messageToToggle.starred.toString());
  
    this.updateStarColor();
    this.cdRef.detectChanges();

    this.updateLocalStorageStarred(messageToToggle);
  }
  
  updateStarColor(): void {
    this.sortedMessages.forEach((message) => {
      const starElement = document.querySelector(`.star-icon[data-message-id="${message.timestamp}"] mat-icon`) as HTMLElement;
      if (starElement) {
        starElement.style.color = message.starred ? '#0093FF' : 'black';
      }
    });
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

      localStorage.setItem('userMessages', JSON.stringify(this.userMessages));
      localStorage.setItem('botMessages', JSON.stringify(this.botMessages));

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
        if (this.mode === 'playful') {
          this.botMessages = [
            { content: "Hiya! I'm Polly, your English buddy! What are we learning today? 😊", timestamp: Date.now(), type: 'bot' }
          ];
        } else {
          this.botMessages = [
            { content: 'Hello! I am your English tutor, Polly. How may I assist you today?', timestamp: Date.now(), type: 'bot' }
          ];
        }
        this.userMessages = [];
        this.cdRef.detectChanges();
        this.scrollToBottom();
      },
      error => {
        console.error('Error changing mode:', error);
      }
    );
  }

  refreshChat(): void {
    this.botMessages = this.mode === 'formal'
      ? [{ content: 'Great, let\'s start over!', timestamp: Date.now(), type: 'bot' }]
      : [{ content: 'Yay 😄 Let\'s start over!', timestamp: Date.now(), type: 'bot' }];
    
    this.userMessages = [];
    // clear msgs
    localStorage.removeItem('userMessages');
    localStorage.removeItem('botMessages');
  
    this.cdRef.detectChanges();
    this.scrollToBottom();
  } 

  saveChatToDatabase(): void {
    this.auth.getCurrentUserId().subscribe(currentUserId => {
      if (currentUserId) {
        const userMessagesWithTypes = this.userMessages.map(msg => ({ ...msg, type: 'user' }));
        const botMessagesWithTypes = this.botMessages.map(msg => ({ ...msg, type: 'bot' }));
  
        const chatData = {
          messages: {
            user: userMessagesWithTypes,
            bot: botMessagesWithTypes
          },
          starred_responses: this.starredResponse.map(({ content }) => ({ content }))
        };
  
        this.firestoreService.updateUserInfo(currentUserId, {
          messages_sent: this.userMessages.length,
          ...chatData
        })
        .then(() => {
          console.log('Chat saved to database successfully');
        })
        .catch(error => {
          console.error('Error saving chat to database', error);
        });
      } else {
        console.error('No current user ID found');
      }
    }, error => {
      console.error('Error getting current user ID', error);
    });
  }
  
}
