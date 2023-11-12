import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PastExercisesComponent } from './pages/past exercises/past-exercises.component';
import { BookLessonComponent } from './pages/book lessons/book-lesson.component';
import { StatsComponent } from './pages/stats/stats.component';
import { ChatbotComponent } from './pages/chatbot/chatbot.component';
import { LoginComponent } from './pages/enter/login/login.component';
import { RegisterComponent } from './pages/enter/register/register-component/register.component';
import { AuthGuard } from './services/authguard.service';
import { RegisterWizardComponent } from './pages/enter/register/register-wizard/register-wizard/register-wizard.component';
import { NotFoundComponent } from './pages/not-found/not-found/not-found.component';
import { PlacementTestComponent } from './pages/enter/placement-test/placement-test.component';
import { TestWritingComponent } from './pages/test-writing/test-writing.component';
import { ExercisesComponent } from './pages/exercises/exercises/exercises.component';

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
      {
        path: "test-writing",
        component: TestWritingComponent
      },
      {
        path: "exercise",
        component: ExercisesComponent
      }
    ]
  },
  {
    path: "login",
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "register",
    component: RegisterComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "register-wizard",
    component: RegisterWizardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "placement-test",
    component: PlacementTestComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: "**",
    component: NotFoundComponent,
    canActivate: [AuthGuard]
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
