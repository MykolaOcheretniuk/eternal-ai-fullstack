import { IUsersRepository } from "@/db/IRepositories/IUsersRepository";
import { IUsersService } from "./IServices/IUsersService";
import { InsertUser, SelectUser } from "@/db/schema/users";
import { ISubscribersRepository } from "@/db/IRepositories/ISubscribersRepository";
import { usersRepository } from "@/db/repositories/UsersRepository";
import { subscribersRepository } from "@/db/repositories/SubscribersRepository";
import { InsertSubscriber, SelectSubscriber } from "@/db/schema/subscribers";
import { SessionUser, Subscriber, UpdateUser } from "@/models/user";
import { ApiError } from "@/errors/ApiError";
import passwordService from "@/utils/passwordService";
import { IStripeService } from "./IServices/IStripeService";
import { stripeService } from "./stripeService";

class UsersService implements IUsersService {
  constructor(
    private readonly usersRepository: IUsersRepository<InsertUser, SelectUser>,
    private readonly subscribersRepository: ISubscribersRepository<
      InsertSubscriber,
      SelectSubscriber
    >,
    private readonly stripeService: IStripeService
  ) {}
  addToSubscribers = async (
    userEmail: string,
    stripeSubId: string,
    stripeCustomerId: string,
    nextPaymentDate: number
  ): Promise<void> => {
    const existingUser = await this.usersRepository.getByEmail(userEmail);
    if (!existingUser) {
      throw ApiError.NotFound("User");
    }
    const { id } = existingUser;
    const subscriber: InsertSubscriber = {
      userId: id,
      stripeSubId: stripeSubId,
      stripeCustomerId: stripeCustomerId,
      nextPaymentDate: nextPaymentDate,
    };
    const isSubscriber = await this.subscribersRepository.get(id);
    if (!isSubscriber) {
      await this.subscribersRepository.add(subscriber);
    }
    await this.subscribersRepository.update(subscriber);
  };
  removeFromSubscribers = async (stripeCustomerId: string): Promise<void> => {
    await this.subscribersRepository.delete(stripeCustomerId);
  };
  setIndividual = async (
    email: string,
    individualName: string
  ): Promise<void> => {
    const existingUser = await this.usersRepository.getByEmail(email);
    if (!existingUser) {
      throw ApiError.NotFound(`User with email ${email} not found`);
    }
    const { id: userId } = existingUser;
    await this.usersRepository.setIndividual(userId, individualName);
  };
  updateUser = async (
    user: UpdateUser,
    email: string
  ): Promise<SessionUser> => {
    const existingUser = await this.usersRepository.getByEmail(email);
    if (!existingUser) {
      throw ApiError.NotFound(`User with email ${email} not found`);
    }
    const { password, email: userEmail, name, phoneNumber } = user;
    if (userEmail) {
      const sameEmailUser = await this.usersRepository.getByEmail(userEmail);
      if (sameEmailUser) {
        throw ApiError.AlreadyExists(
          `User with email ${userEmail} already exists`
        );
      }
    }
    let passwordHash = existingUser.passwordHash;
    if (password) {
      passwordHash = await passwordService.hashPassword(password);
    }
    const newUser = Object.assign({}, existingUser, {
      passwordHash: passwordHash,
      name: name ? name : existingUser.name,
      email: userEmail ? userEmail : existingUser.email,
      phoneNumber: phoneNumber ? phoneNumber : existingUser.phoneNumber,
    });
    await this.usersRepository.updateUser(newUser);
    return Object.assign({}, newUser, { passwordHash: undefined });
  };

  getSubscriber = async (userId: string): Promise<Subscriber | null> => {
    const subscriber = await this.subscribersRepository.get(userId);
    const { status: subStatus } = await this.stripeService.getSubscription(
      userId
    );
    if (subscriber) {
      return { ...subscriber, status: subStatus.toString() };
    } else {
      return null;
    }
  };
}
export const usersService = new UsersService(
  usersRepository,
  subscribersRepository,
  stripeService
);
