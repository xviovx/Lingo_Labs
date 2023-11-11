import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { FirebaseModule } from './firebase/firebase/firebase.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

//materials
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material/core';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';

//components
import { HomeComponent } from './pages/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ChatbotComponent } from './pages/chatbot/chatbot.component';
import { LoginComponent } from './pages/enter/login/login.component';
import { RegisterComponent } from './pages/enter/register/register-component/register.component';
import { RegisterWizardComponent } from './pages/enter/register/register-wizard/register-wizard/register-wizard.component';
import { NotFoundComponent } from './pages/not-found/not-found/not-found.component';
import { PlacementTestComponent } from './pages/enter/placement-test/placement-test.component';
import { TimeFormatPipe } from './pipes/time-format.pipe';
import { TestWritingComponent } from './pages/test-writing/test-writing.component';
import { SaveChatDialogComponent } from './subcomponents/save-chat-dialog/save-chat-dialog.component';
import { FilterChatPipe } from './pipes/filter-chat.pipe';
import { ConfirmDeleteComponent } from './subcomponents/confirm-delete/confirm-delete.component';
import { BookLessonComponent } from './pages/book lessons/book-lesson.component';
import { EmailModalComponent } from './subcomponents/email-modal/email-modal.component';
import { StatsComponent } from './pages/stats/stats.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatbotComponent,
    LoginComponent,
    RegisterComponent,
    RegisterWizardComponent,
    NotFoundComponent,
    PlacementTestComponent,
    TimeFormatPipe,
    TestWritingComponent,
    SaveChatDialogComponent,
    FilterChatPipe,
    ConfirmDeleteComponent,
    BookLessonComponent,
    EmailModalComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatSidenavModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    CommonModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    FirebaseModule,
    MatStepperModule,
    MatDialogModule,
    MatNativeDateModule,
    MatDatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent] // the first initial component
})
export class AppModule { }
