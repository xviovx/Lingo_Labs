import { Message } from "./message.model";

export interface ChatData {
    timestamp: string,
    title: string;
    messages: {
      user: Message[];
      bot: Message[];
    };
  }
  