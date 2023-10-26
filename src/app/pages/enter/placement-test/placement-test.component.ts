import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-placement-test',
  templateUrl: './placement-test.component.html',
  styleUrls: ['./placement-test.component.scss']
})
export class PlacementTestComponent implements OnInit, OnDestroy{
  selectedOption: string | null = null;
  isTestStarted: boolean = false;
  isTestFinished: boolean = true;
  isModalOpen = false;
  currentQuestionIndex = 0;
  score = 0;
  questions = [
    //general
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
    //listening

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

  private audio = new Audio();

  ngOnInit() {
    this.audio.src = "../../../assets/test_audio.mp3";
    this.audio.load();
  }

  playAudio() {
    this.audio.play();
  }

  pauseAudio() {
    this.audio.pause();
  }

  ngOnDestroy() {
    this.audio.pause();
    this.audio = new Audio();  // This will release the audio resource
  }

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  startTest() {
    this.isModalOpen = false;
    this.isTestStarted = true;
  }

  submitAnswer(answer: string | null) {
    if (!answer) return;
  
    localStorage.setItem(`question_${this.currentQuestionIndex}`, answer);
  
    if (answer === this.questions[this.currentQuestionIndex].correctOption) {
      this.score++;
      console.log(this.score);
    }
  
    this.currentQuestionIndex++;
  
    if (this.currentQuestionIndex >= this.questions.length) {
      this.isTestStarted = false;
      this.isTestFinished = true;
      localStorage.setItem('score', this.score.toString());
    } else {
      this.selectedOption = null;
    }
  }  
}
