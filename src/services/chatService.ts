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
