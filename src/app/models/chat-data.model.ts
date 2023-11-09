import { Message } from "./message.model";

export interface ChatData {
  id?: any, 
  timestamp: string,
    title: string;
    messages: {
      user: Message[];
      bot: Message[];
    };
  }
  