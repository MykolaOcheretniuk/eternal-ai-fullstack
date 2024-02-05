import getEnv from "@/utils/getEnv";
import { IChatGptService } from "./IServices/IChatGptService";
import OpenAI from "openai";

class ChatGptService implements IChatGptService {
  private openAi: OpenAI;
  constructor() {
    this.openAi = new OpenAI({
      apiKey: getEnv("OPENAI_API_KEY"),
    });
  }
  getAnswerFromClint = async (
    individualName: string,
    question: string
  ): Promise<string> => {
    const response = await this.openAi.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Give me a possible ${individualName} answer to ${question}`,
        },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.1,
    });
    const { choices } = response;
    return JSON.parse(choices[0].message?.content as string);
  };
}
export const chatGptService = new ChatGptService();
