import { MySql2Database } from "drizzle-orm/mysql2";
import { IUsersRepository } from "../IRepositories/IUsersRepository";
import { InsertUser, SelectUser, users } from "../schema/users";
import { database } from "../dbConnection";
import { eq, getTableColumns } from "drizzle-orm";
import { ISubscribersRepository } from "../IRepositories/ISubscribersRepository";
import {
  InsertSubscriber,
  SelectSubscriber,
  subscribers,
} from "../schema/subscribers";

class SubscribersRepository
  implements ISubscribersRepository<InsertSubscriber, SelectSubscriber>
{
  constructor(private readonly db: MySql2Database) {}
  add = async (subscriber: InsertSubscriber): Promise<void> => {
    await this.db.insert(subscribers).values(subscriber);
  };
  update = async (subscriber: InsertSubscriber): Promise<void> => {
    const { userId } = subscriber;
    await this.db
      .update(subscribers)
      .set(subscriber)
      .where(eq(subscribers.userId, userId));
  };
  delete = async (customerId: string): Promise<void> => {
    await this.db
      .delete(subscribers)
      .where(eq(subscribers.stripeCustomerId, customerId));
  };
  get = async (userId: string): Promise<SelectSubscriber> => {
    const response = await this.db
      .select()
      .from(subscribers)
      .where(eq(subscribers.userId, userId));
    return response[0];
  };
}
export const subscribersRepository = new SubscribersRepository(database);
