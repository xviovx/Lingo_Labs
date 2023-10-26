import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-placement-test',
  templateUrl: './placement-test.component.html',
  styleUrls: ['./placement-test.component.scss']
})
export class PlacementTestComponent implements OnInit, OnDestroy{
  showReadingText: boolean = false;
  showListeningModal: boolean = false;
  showReadingModal: boolean = false;
  isPlaying = false;
  audio = new Audio("../../../assets/test_audio.mp3");
  duration = 0;
  currentTime = 0;
  selectedOption: string | null = null;
  isTestStarted: boolean = true;
  isTestFinished: boolean = false;
  isModalOpen = false;
  currentQuestionIndex = 0;
  score = 0;
  
  questions = [
    // general questions
    {
      type: "general",
      text: "You _______ all go to London next weekend",
      options: ["are", "have", "can", "need"],
      correctOption: "can"
    },
    {
      type: "general",
      text: "We _______ go to the beach if it's raining.",
      options: ["will", "would", "should", "won't"],
      correctOption: "won't"
    },
    {
      type: "general",
      text: "He _______ finished his homework yet.",
      options: ["hasn't", "don't", "hasn't been", "isn't"],
      correctOption: "hasn't"
    },
    {
      type: "general",
      text: "She can sing _______.",
      options: ["good", "best", "well", "betterly"],
      correctOption: "well"
    },
    {
      type: "general",
      text: "I'm afraid of _______ in the dark.",
      options: ["walks", "walked", "walking", "to walk"],
      correctOption: "walking"
    },
    {
      type: "general",
      text: "She has been living here _______ 2010.",
      options: ["since", "for", "during", "by"],
      correctOption: "since"
    },
    {
      type: "general",
      text: "I _______ have some milk in my coffee.",
      options: ["like", "likes", "would like", "liking"],
      correctOption: "would like"
    },
    {
      type: "general",
      text: "Every student _______ wear a uniform.",
      options: ["has to", "don't have to", "doesn't has to", "need"],
      correctOption: "has to"
    },
    {
      type: "general",
      text: "She _______ her keys. She can't find them anywhere.",
      options: ["loses", "losted", "has lost", "was lost"],
      correctOption: "has lost"
    },
    {
      type: "general",
      text: "If I _______ you, I'd study more.",
      options: ["am", "was", "were", "had been"],
      correctOption: "were"
    },
    //listening questions
    {
      type: "listening",
      text: "How does the spaceship initially move after its rockets are ignited?",
      options: ["Vertically", "Horizontally", "Diagonally", "Randomly"],
      correctOption: "Vertically"
    },
    {
      type: "listening",
      text: "What change in direction does the spaceship make when it reaches space?",
      options: ["Turns vertically", "Remains vertical", "Turns horizontally", "Moves randomly"],
      correctOption: "Turns horizontally"
    },
    {
      type: "listening",
      text: "When the spaceship is in space and its rockets stop, what happens to its speed?",
      options: ["Increases due to air resistance", "Decreases due to air resistance", "Remains the same because there's no air resistance", "Stops completely"],
      correctOption: "Remains the same because there's no air resistance"
    },
    {
      type: "listening",
      text: "What would cause the spaceship to slow down if it were still within the Earth's atmosphere?",
      options: ["Lack of gravity", "Air resistance", "The speed of the rockets", "The weight of the astronauts"],
      correctOption: "Air resistance"
    },
    {
      type: "listening",
      text: "Is there gravity in space above the Earth?",
      options: ["Yes, but only a little", "No, there's no gravity at all", "Yes, the Earth's gravity still affects objects in space", "No, that's why astronauts are weightless"],
      correctOption: "Yes, the Earth's gravity still affects objects in space"
    },
    {
      type: "listening",
      text: "Why are astronauts weightless in space?",
      options: ["Because there's no gravity in space", "Due to the high speed of the spaceship", "Because they're constantly falling and gravity is still pulling them", "They are not weightless, it just appears so"],
      correctOption: "Because they're constantly falling and gravity is still pulling them"
    },
    {
      type: "listening",
      text: "Even though the spaceship is in space and is affected by Earth's gravity, why doesn't it move toward the Earth?",
      options: ["It's held in place by the Sun's gravity", "It travels around the Earth due to its high speed", "The ship's rockets push it away from Earth", "It moves in a random pattern"],
      correctOption: "It travels around the Earth due to its high speed"
    },
    {
      type: "listening",
      text: "When the spaceship's rockets are active, what do they help the spaceship achieve?",
      options: ["Air resistance", "Weightlessness", "A very high speed", "Vertical position"],
      correctOption: "A very high speed"
    },
    {
      type: "listening",
      text: "What misconception do most people have about space?",
      options: ["That there's air in space", "That the Earth has no gravity", "That spaceships fly randomly", "That there's no gravity in space"],
      correctOption: "That there's no gravity in space"
    },
    {
      type: "listening",
      text: "What is the constant state of the spaceship and its crew when in orbit?",
      options: ["Floating still", "Moving away from Earth", "Rising higher into space", "Constantly falling due to gravity"],
      correctOption: "Constantly falling due to gravity"
    },
    // reading questions
    {
      type: "reading",
      text: "Why were the Romans well-known regarding infrastructure?",
      options: ["Their expertise in building railroads", "Their network of sea routes", "Their extensive road network", "Their construction of large buildings"],
      correctOption: "Their extensive road network"
  },
  {
      type: "reading",
      text: "What was a primary purpose of the Roman road network?",
      options: ["Leisurely travel", "Military operations and trade", "Artistic displays", "Religious ceremonies"],
      correctOption: "Military operations and trade"
  },
  {
      type: "reading",
      text: "How did other countries benefit from the Roman road network?",
      options: ["They learned new construction techniques.", "They were incorporated into an international infrastructure.", "They received gifts from Rome.", "They got opportunities to trade with Asia."],
      correctOption: "They were incorporated into an international infrastructure."
  },
  {
      type: "reading",
      text: "Approximately how long ago was the Roman road network established?",
      options: ["1,000 years ago", "500 years ago", "2,000 years ago", "3,000 years ago"],
      correctOption: "2,000 years ago"
  },
  {
      type: "reading",
      text: "How is the Roman road network described in terms of engineering?",
      options: ["An average construction", "An expensive endeavor", "A failed project", "An incredible engineering achievement"],
      correctOption: "An incredible engineering achievement"
  },
  {
      type: "reading",
      text: "What major infrastructure projects were developed after the Roman roads and before the 20th century?",
      options: ["Skyscrapers", "Canals and railroads", "Airports", "Subways"],
      correctOption: "Canals and railroads"
  },
  {
      type: "reading",
      text: "When did large-scale highway construction resume after the Roman era?",
      options: ["18th century", "19th century", "Mid-20th century", "Early 21st century"],
      correctOption: "Mid-20th century"
  },
  {
      type: "reading",
      text: "What characteristic of the new European freeways shows the influence of Roman roads?",
      options: ["They have tolls.", "They follow the same direct routes as the Roman roads.", "They are built using Roman construction techniques.", "They all lead to Rome."],
      correctOption: "They follow the same direct routes as the Roman roads."
  },
  {
      type: "reading",
      text: "According to the text, what was special about the Roman roads compared to the roads that existed in other countries before?",
      options: ["They were shorter.", "They were mostly straight and provided a fast connection.", "They had a lot of curves.", "They were primarily used for leisurely travels."],
      correctOption: "They were mostly straight and provided a fast connection."
  },
  {
      type: "reading",
      text: "The Roman road strategy played a crucial role in the expansion of the Roman Empire across which continents?",
      options: ["Europe, Asia, and Africa", "Europe, Asia, and America", "Europe, Africa, and America", "Asia, Africa, and Australia"],
      correctOption: "Europe, Asia, and Africa"
  },
  ];
  
  goBack() {
    if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--;
        const prevAnswer = localStorage.getItem(`question_${this.currentQuestionIndex}`);
        this.selectedOption = prevAnswer || null;
    }
  }
  
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

  checkQuestionIndex() {
    if (this.currentQuestionIndex === 10) {
      this.showListeningModal = true;
    } else if (this.currentQuestionIndex === 20) {
      this.showReadingModal = true;
      this.showReadingText = true;
    } else {
      this.showReadingText = false;
    }
  }  

  ngOnInit() {
    this.audio.load();
    this.audio.onloadedmetadata = () => {
        this.duration = Math.floor(this.audio.duration);
    };
    
    this.audio.ontimeupdate = () => {
        this.currentTime = Math.floor(this.audio.currentTime);
    };

    this.currentQuestionIndex = 20;  // set to 20 manually for testing
    this.checkQuestionIndex();
  }

  toggleAudio() {
    if (this.isPlaying) {
        this.audio.pause();
    } else {
        this.audio.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  ngOnDestroy() {
    this.audio.pause();
    this.audio = new Audio(); 
  }
  
  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  closeReading() {
    this.showReadingModal = false;
  }

  closeListening() {
    this.showListeningModal = false;
  }

  startTest() {
    this.isModalOpen = false;
    this.isTestStarted = true;
  }

  goNext() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }  

  submitAnswer(answer: string | null) {
    if (this.currentQuestionIndex !== 20 && !answer) return;

    if (answer) {
        localStorage.setItem(`question_${this.currentQuestionIndex}`, answer);

        if (answer === this.questions[this.currentQuestionIndex].correctOption) {
            this.score++;
            console.log(this.score);
        }
    }

    if (this.currentQuestionIndex === 20) {
        this.currentQuestionIndex = 21;
        this.showReadingText = false;
        return;
    } else {
        this.currentQuestionIndex++;
    }
    
    this.checkQuestionIndex();

    if (this.currentQuestionIndex >= this.questions.length) {
        this.isTestStarted = false;
        this.isTestFinished = true;
        localStorage.setItem('score', this.score.toString());
    } else {
        this.selectedOption = null;
    }
  }
}
