export interface IChatGptService {
  getAnswerFromClint(individualName: string, question: string): Promise<string>;
}
