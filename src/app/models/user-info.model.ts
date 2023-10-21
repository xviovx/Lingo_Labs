import firebase from 'firebase/compat/app';

export interface UserInfo {
  current_streak: number;
  date_joined: firebase.firestore.Timestamp;
  exercises_complete: number;
  level: string;
  live_sessions: number;
  location: string;
  longest_streak: number;
  messages_sent: number;
  name: string;
  time_in_chat: number;
  time_learning: number;
}