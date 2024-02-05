export interface IChatService {
  getAnswer(question: string, userEmail: string): Promise<string>;
}
