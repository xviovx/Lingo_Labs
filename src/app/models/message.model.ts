export interface Message {
    content: string;
    timestamp: number;
    type: string;
    starred?: boolean;
}