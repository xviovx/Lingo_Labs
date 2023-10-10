import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
})
export class ChatbotComponent implements OnInit {
  starActive = false;

  ngOnInit(): void {
    this.starActive = localStorage.getItem('starActive') === 'true';
  }

  toggleStar(): void {
    this.starActive = !this.starActive;
    localStorage.setItem('starActive', this.starActive.toString());
  }

  characterCount: number = 0;

  updateCharacterCount(event: Event): void {
      const inputElement = event.target as HTMLInputElement;
      this.characterCount = inputElement.value.length;
      const charCountElement = document.getElementById('char-count');
      if (charCountElement) {
          charCountElement.innerText = `${this.characterCount} / 1000`;
      }
  }
  

    sendMessage(): void {
        
    }
}

