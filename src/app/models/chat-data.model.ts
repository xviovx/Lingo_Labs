import { Message } from "./message.model";

export interface ChatData {
  id?: any;
  timestamp: string;
  mode: "formal | playful";
  title: string;
  messages: {
    user: Message[];
    bot: Message[];
  };
}
  