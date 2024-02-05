import { Card } from "@/models/payment";
import Stripe from "stripe";

export interface IStripeService {
  cancelSubscriptionAtPeriodEnd(userId: string): Promise<void>;
  getSubscription(userId: string): Promise<Stripe.Subscription>;
  updateCustomer(
    userId: string,
    newEmail: string,
    name: string | null
  ): Promise<void>;
  updatePaymentMethod(userId: string, card: Card): Promise<void>;
  subscribeUser(userEmail: string, card: Card): Promise<void>;
}
