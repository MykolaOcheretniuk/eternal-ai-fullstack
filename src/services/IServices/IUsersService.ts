import { SelectSubscriber } from "@/db/schema/subscribers";
import { SessionUser, UpdateUser } from "@/models/user";

export interface IUsersService {
  getSubscriber(userId: string): Promise<SelectSubscriber | null>;
  updateUser(user: UpdateUser, email: string): Promise<SessionUser>;
  setIndividual(email: string, individualName: string): Promise<void>;
  addToSubscribers(
    userEmail: string,
    stripeSubId: string,
    stripeCustomerId: string,
    nextPaymentDate: number
  ): Promise<void>;
  removeFromSubscribers(stripeCustomerId: string): Promise<void>;
}
