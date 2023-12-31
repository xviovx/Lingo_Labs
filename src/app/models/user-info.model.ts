import { Message } from "./message.model";

export interface UserInfo {
  email: string;
  current_streak: number;
  level_progress: number;
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
  messages?: {
    user: Message[];
    bot: Message[];
  };
}
