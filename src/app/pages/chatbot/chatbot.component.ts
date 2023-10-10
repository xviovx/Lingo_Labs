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
    this.updateStarColor();
  }

  toggleStar(): void {
    this.starActive = !this.starActive;
    localStorage.setItem('starActive', this.starActive.toString());
    console.log('toggleStar called, this.starActive:', this.starActive);
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

    onRowClick(): void {
      console.log('Row clicked');
    }
    
}

