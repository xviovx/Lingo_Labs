import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PastExercisesComponent } from './pages/past exercises/past-exercises.component';
import { BookLessonComponent } from './pages/book lessons/book-lesson.component';
import { StatsComponent } from './pages/stats/stats.component';
import { ChatbotComponent } from './pages/chatbot/chatbot.component';
import { LoginComponent } from './pages/enter/login/login.component';
import { RegisterComponent } from './pages/enter/register/register.component';
import { AuthGuard } from './services/authguard.service';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
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
      },
    ]
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
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
