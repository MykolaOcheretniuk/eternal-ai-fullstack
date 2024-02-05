import Stripe from "stripe";
import { IStripeService } from "./IServices/IStripeService";
import getEnv from "@/utils/getEnv";
import { ApiError } from "@/errors/ApiError";
import { Card } from "@/models/payment";
import { subscribersRepository } from "@/db/repositories/SubscribersRepository";
import { usersRepository } from "@/db/repositories/UsersRepository";
import { IUsersRepository } from "@/db/IRepositories/IUsersRepository";
import { InsertUser, SelectUser } from "@/db/schema/users";
import { ISubscribersRepository } from "@/db/IRepositories/ISubscribersRepository";
import { InsertSubscriber, SelectSubscriber } from "@/db/schema/subscribers";

class StripeService implements IStripeService {
  constructor(
    private readonly usersRepository: IUsersRepository<InsertUser, SelectUser>,
    private readonly subscribersRepository: ISubscribersRepository<
      InsertSubscriber,
      SelectSubscriber
    >
  ) {}
  private stripe = new Stripe(getEnv("STRIPE_SECRET_KEY") as string);
  private createCardPaymentMethod = async (card: Card) => {
    return await this.stripe.paymentMethods.create({
      type: "card",
      card: card,
    });
  };
  private createStripeCustomer = async (
    userEmail: string,
    userName: string
  ) => {
    return await this.stripe.customers.create({
      email: userEmail,
      name: userName as string,
    });
  };
  private setPaymentMethod = async (
    paymentMethodId: string,
    stripeCustomerId: string
  ) => {
    await this.stripe.paymentMethods.attach(paymentMethodId, {
      customer: stripeCustomerId,
    });
    await this.stripe.customers.update(stripeCustomerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });
  };
  cancelSubscriptionAtPeriodEnd = async (userId: string) => {
    const { stripeSubId } = await this.subscribersRepository.get(userId);
    await this.stripe.subscriptions.update(stripeSubId, {
      cancel_at_period_end: true,
    });
  };
  getSubscription = async (userId: string) => {
    const { stripeSubId, stripeCustomerId } =
      await this.subscribersRepository.get(userId);
    const subscribes = await this.stripe.subscriptions.list({
      customer: stripeCustomerId,
      status: "all",
    });
    return subscribes.data.find(
      (sub) => sub.id === stripeSubId
    ) as Stripe.Subscription;
  };
  updateCustomer = async (
    userId: string,
    newEmail: string,
    name: string | null
  ) => {
    const { stripeCustomerId } = await this.subscribersRepository.get(userId);
    if (!name) {
      name = newEmail;
    }
    await this.stripe.customers.update(stripeCustomerId, {
      email: newEmail,
      name: name,
    });
  };

  updatePaymentMethod = async (userId: string, card: Card) => {
    const { stripeCustomerId } = await this.subscribersRepository.get(userId);
    const { id: paymentMethodId } = await this.createCardPaymentMethod(card);
    const { data: paymentMethods } = await this.stripe.paymentMethods.list({
      customer: stripeCustomerId,
      type: "card",
    });
    paymentMethods.forEach(async (paymentMethod) => {
      await this.stripe.paymentMethods.detach(paymentMethod.id);
    });
    await this.setPaymentMethod(paymentMethodId, stripeCustomerId);
  };
  subscribeUser = async (userEmail: string, card: Card) => {
    const user = await this.usersRepository.getByEmail(userEmail);
    if (!user) {
      throw ApiError.NotFound("User");
    }
    const { id: userId } = user;
    const isSubscriber = await this.subscribersRepository.get(userId);
    if (isSubscriber) {
      throw ApiError.AlreadyExists("Subscriber");
    }
    let { email, name } = user;
    if (!name) {
      name = email;
    }
    const { id: customerId } = await this.createStripeCustomer(email, name);
    const { id: paymentMethodId } = await this.createCardPaymentMethod(card);
    const priceId = getEnv("STRIPE_PRICE_ID");
    await this.setPaymentMethod(paymentMethodId, customerId);
    await this.stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
    });
  };
}
export const stripeService = new StripeService(
  usersRepository,
  subscribersRepository
);
