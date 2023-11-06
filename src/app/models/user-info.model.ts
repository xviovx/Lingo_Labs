export interface UserInfo {
  email: string;
  current_streak: number;
  exercises_complete: number;
  level: string;
  live_sessions: number;
  location: string;
  longest_streak: number;
  messages_sent: number;
  name: string;
  time_in_chat: number;
  time_learning: number;
  starred_responses?: { content: string;}[];
}
