import { Component } from '@angular/core';

@Component({
  selector: 'app-placement-test',
  templateUrl: './placement-test.component.html',
  styleUrls: ['./placement-test.component.scss']
})
export class PlacementTestComponent {
  selectedOption: boolean = true;
  isTestStarted: boolean = false;
  isModalOpen = false;
  currentQuestionIndex = 0;
  questions = [
    {
      text: "You ____________ all go to London next weekend",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctOption: "Option A"
    },
    // questions go here
  ];

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  startTest() {
    this.isModalOpen = false;
    this.isTestStarted = true;
  }

  submitAnswer(answer: string) {
    // test logic
    if (answer === this.questions[this.currentQuestionIndex].correctOption) {
      // correct answer logic
    }
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex >= this.questions.length) {
      this.isTestStarted = false;
      // test completion logic
    }
  }
}
