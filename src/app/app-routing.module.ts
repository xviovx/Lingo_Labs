import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PastExercisesComponent } from './pages/past exercises/past-exercises.component';
import { BookLessonComponent } from './pages/book lessons/book-lesson.component';
import { StatsComponent } from './pages/stats/stats.component';
import { ChatbotComponent } from './pages/chatbot/chatbot.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'past-exercises',
    component: PastExercisesComponent
  },
  {
    path: 'book-lesson',
    component: BookLessonComponent
  },
  {
    path: 'stats',
    component: StatsComponent
  },
  {
    path: "chatbot",
    component: ChatbotComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
