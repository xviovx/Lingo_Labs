import { Component } from '@angular/core';

@Component({
  selector: 'app-placement-test',
  templateUrl: './placement-test.component.html',
  styleUrls: ['./placement-test.component.scss']
})
export class PlacementTestComponent {
  selectedOption: string | null = null;
  isTestStarted: boolean = true;
  isModalOpen = false;
  currentQuestionIndex = 0;
  score = 0;
  questions = [
    {
      text: "You _______ all go to London next weekend",
      options: ["are", "have", "can", "need"],
      correctOption: "can"
    },
    {
      text: "We _______ go to the beach if it's raining.",
      options: ["will", "would", "should", "won't"],
      correctOption: "won't"
    },
    {
      text: "He _______ finished his homework yet.",
      options: ["hasn't", "don't", "hasn't been", "isn't"],
      correctOption: "hasn't"
    },
    {
      text: "She can sing _______.",
      options: ["good", "best", "well", "betterly"],
      correctOption: "well"
    },
    {
      text: "I'm afraid of _______ in the dark.",
      options: ["walks", "walked", "walking", "to walk"],
      correctOption: "walking"
    },
    {
      text: "She has been living here _______ 2010.",
      options: ["since", "for", "during", "by"],
      correctOption: "since"
    },
    {
      text: "I _______ have some milk in my coffee.",
      options: ["like", "likes", "would like", "liking"],
      correctOption: "would like"
    },
    {
      text: "Every student _______ wear a uniform.",
      options: ["has to", "don't have to", "doesn't has to", "need"],
      correctOption: "has to"
    },
    {
      text: "She _______ her keys. She can't find them anywhere.",
      options: ["loses", "losted", "has lost", "was lost"],
      correctOption: "has lost"
    },
    {
      text: "If I _______ you, I'd study more.",
      options: ["am", "was", "were", "had been"],
      correctOption: "were"
    },
    {
      text: "I wish I _______ fly.",
      options: ["can", "could", "canning", "will"],
      correctOption: "could"
    }
  ];

  constructor() {
    const previousScore = localStorage.getItem('score');
    if (previousScore) {
      this.score = +previousScore;
    }

    const previousAnswers = localStorage.getItem('answers');
    if (previousAnswers) {
      const answers = JSON.parse(previousAnswers);
    }
  }

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  startTest() {
    this.isModalOpen = false;
    this.isTestStarted = true;
  }

  submitAnswer(answer: string) {
    localStorage.setItem(`question_${this.currentQuestionIndex}`, answer);
    
    if (answer === this.questions[this.currentQuestionIndex].correctOption) {
      this.score++;
    }

    this.currentQuestionIndex++;
    
    if (this.currentQuestionIndex >= this.questions.length) {
      this.isTestStarted = false;
      localStorage.setItem('score', this.score.toString());
    } else {
      this.selectedOption = null;
    }
  }
}
