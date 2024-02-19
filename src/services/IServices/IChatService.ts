import { ChatLog } from "@/models/message";

export interface IChatService {
  getAnswer(question: string, userEmail: string): Promise<string>;
  getChatLog(
    userId: string,
    individual: string,
    page: number,
    limit: number
  ): Promise<ChatLog[]>;
}
