export interface ChatLog {
  question: string;
  answer: string | null;
  individualIcon: string;
}
export interface ChatMessage {
  messageId: number;
  fromUser: boolean;
  userId: number;
  famousPersonId: number;
  famousPersonName: string;
  famousPersonDescription: string;
  content: string;
}
export interface Message {
  text: string | null;
  fromUser: boolean;
}
