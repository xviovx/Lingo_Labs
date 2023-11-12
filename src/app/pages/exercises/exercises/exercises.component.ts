import { Component, OnInit} from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AuthService } from 'src/app/services/firebase-auth.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent  implements OnInit{
  showReadingText: boolean = true;
  selectedOption: string | null = null;
  isTestStarted: boolean = true;
  isTestFinished: boolean = false;
  currentQuestionIndex = 0;
  score: number = 0;
  level: string = "";
  userId: string | null = null;
  
  questions = [
    {
      type: "reading",
      text: "What is the Internet often compared to in terms of its function?",
      options: ["A global library", "A global roadway for information", "A worldwide postal service", "An international telephone network"],
      correctOption: "A global roadway for information"
      },
      {
      type: "reading",
      text: "How has the Internet impacted global communication and data exchange?",
      options: ["By limiting data flow to certain regions", "By bridging gaps and enabling unprecedented connectivity", "By making communication more expensive", "By decreasing the speed of information exchange"],
      correctOption: "By bridging gaps and enabling unprecedented connectivity"
      },
      {
      type: "reading",
      text: "What was the state of the Internet at its inception?",
      options: ["It connected billions of devices", "It was a simple network connecting a few computers", "It was primarily used for military purposes", "It was a vast network of interconnected servers"],
      correctOption: "It was a simple network connecting a few computers"
      },
      {
      type: "reading",
      text: "How does the paragraph describe the evolution of the Internet?",
      options: ["As a gradual decline in importance", "As a stable and unchanging system", "As a transformation from a simple to an intricate web linking billions of devices", "As a quick and sudden expansion"],
      correctOption: "As a transformation from a simple to an intricate web linking billions of devices"
      },
      {
      type: "reading",
      text: "What role does the Internet play in the modern world, according to the text?",
      options: ["It is a minor tool for communication", "It is the foundation of our interconnected world", "It serves only entertainment purposes", "It is used primarily for academic research"],
      correctOption: "It is the foundation of our interconnected world"
      },
  ];
  
  goBack() {
    if (this.currentQuestionIndex === 20 && this.showReadingText) {
        this.showReadingText = false;
    }

    if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--;
        const prevAnswer = localStorage.getItem(`question_${this.currentQuestionIndex}`);
        this.selectedOption = prevAnswer || null;
    }
  }
  
  constructor(private sharedService: SharedService, private router: Router, private firestoreService: FirestoreService, private authService: AuthService) {
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
    if (this.currentQuestionIndex === 0) {
      this.showReadingText = true;
    }
  }  

  ngOnInit() {
    this.score = 0;
    localStorage.clear(); 

    this.authService.getCurrentUserId().subscribe((userId: string | null) => {
      this.userId = userId;
    });
  }

  restartTest(): void {
    this.router.navigateByUrl('/some-temp-route').then(() => {
      this.router.navigate(['/placement-test']); 
    });
  }  

  startTest() {
    this.isTestStarted = true;
  }

  goNext() {
    if (this.currentQuestionIndex === 0) {
      this.showReadingText = false;
    }

    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  getLevelBasedOnScore(): string {
    if (this.score <= 5) {
        return 'A1'; 
    } else if (this.score <= 10) {
        return 'A2'; 
    } else if (this.score <= 15) {
        return 'B1'; 
    } else if (this.score <= 20) {
        return 'B2'; 
    } else if (this.score <= 25) {
        return 'C1'; 
    } else {
        return 'C2'; 
    }
}

submitAnswer(answer: string | null) {
  // If no answer is given and it's not the reading text, return
  if (this.currentQuestionIndex !== 0 && !answer) return;

  // Handle saving the answer
  if (answer) {
      localStorage.setItem(`question_${this.currentQuestionIndex}`, answer);
      if (answer === this.questions[this.currentQuestionIndex].correctOption) {
          this.score++;
          console.log(this.score);
      }
  }

  // Special handling for the reading text (index 0)
  if (this.currentQuestionIndex === 0) {
      this.showReadingText = false;
      this.currentQuestionIndex++;
      return;
  }

  // Increment the question index for other cases
  if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
  } else {
      // Handle the end of the test
      this.isTestStarted = false;
      this.isTestFinished = true;
      localStorage.setItem('score', this.score.toString());
      this.level = this.getLevelBasedOnScore();
  }

  // Reset the selected option for the next question
  this.selectedOption = null;
}

navigateToHomeAndUpdateProgress() {
  // Check if userId is not null before proceeding
  if (this.userId) {
    this.firestoreService.updateLevelProgress(this.userId, 10).then(() => {
      this.router.navigate(['/home']);
    }).catch(error => {
      console.error('Error updating level progress:', error);
    });
  } else {
    console.error('User ID is null, cannot update level progress');
    // Optionally handle the case where the user ID is null, e.g., navigate to a different route
  }
}


}

