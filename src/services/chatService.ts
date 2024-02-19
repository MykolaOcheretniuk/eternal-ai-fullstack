import { IUsersRepository } from "@/db/IRepositories/IUsersRepository";
import { IChatGptService } from "./IServices/IChatGptService";
import { IChatService } from "./IServices/IChatService";
import { chatGptService } from "./chatGptService";
import { InsertUser, SelectUser } from "@/db/schema/users";
import { IChatRepository } from "@/db/IRepositories/IChatRepository";
import { ChatLogInsert, ChatLogSelect } from "@/db/schema/chatLog";
import { usersRepository } from "@/db/repositories/UsersRepository";
import { chatRepository } from "@/db/repositories/ChatRepository";
import { ApiError } from "@/errors/ApiError";
import { UsersError } from "@/errors/UserErrors";
import { ISubscribersRepository } from "@/db/IRepositories/ISubscribersRepository";
import { subscribersRepository } from "@/db/repositories/SubscribersRepository";
import { IStripeService } from "./IServices/IStripeService";
import { stripeService } from "./stripeService";
import { InsertSubscriber, SelectSubscriber } from "@/db/schema/subscribers";
import { ChatLog } from "@/models/message";
import individuals from "../../public/individuals.json";

class ChatService implements IChatService {
  constructor(
    private readonly chatGptService: IChatGptService,
    private readonly usersRepository: IUsersRepository<InsertUser, SelectUser>,
    private readonly chatRepository: IChatRepository<
      ChatLogInsert,
      ChatLogSelect
    >,
    private readonly subscribersRepository: ISubscribersRepository<
      InsertSubscriber,
      SelectSubscriber
    >,
    private readonly stripeService: IStripeService
  ) {}
  getChatLog = async (
    userId: string,
    individual: string,
    page: number,
    limit: number
  ): Promise<ChatLog[]> => {
    const offset = (page - 1) * limit;
    const chatLog = await this.chatRepository.get(
      userId,
      individual,
      limit,
      offset
    );
    return chatLog.map((log) => {
      return {
        answer: log.answer,
        question: log.question,
        individualIcon: individuals.find((individual) => {
          if (individual.name === log.individual) {
            return individual;
          }
        })?.photoPath as string,
      };
    });
  };
  getAnswer = async (question: string, userEmail: string): Promise<string> => {
    const existingUser = await usersRepository.getByEmail(userEmail);
    if (!existingUser) {
      throw ApiError.NotFound(`User with email ${userEmail} not found`);
    }
    const { id: userId } = existingUser;
    const individualName = await usersRepository.getCurrentIndividual(userId);
    if (!individualName) {
      throw UsersError.NoIndividualSet();
    }
    const answer = await this.chatGptService.getAnswerFromClint(
      individualName,
      question
    );
    const chatLog: ChatLogInsert = {
      userId,
      individual: individualName,
      question,
      answer,
      created: Date.now(),
    };
    const subscriber = await this.subscribersRepository.get(userId);
    if (subscriber) {
      const { status: subStatus } = await this.stripeService.getSubscription(
        userId
      );
      if (subStatus === "active") {
        await this.chatRepository.createNew(chatLog);
        return answer;
      }
    }
    const { questions } = existingUser;
    if (questions === 0) {
      throw UsersError.QuestionsLimit();
    }
    existingUser.questions--;
    await this.usersRepository.updateUser(existingUser);
    await this.chatRepository.createNew(chatLog);
    return answer;
  };
}
export const chatService = new ChatService(
  chatGptService,
  usersRepository,
  chatRepository,
  subscribersRepository,
  stripeService
);
