import { MySql2Database } from "drizzle-orm/mysql2";
import { IUsersRepository } from "../IRepositories/IUsersRepository";
import { InsertUser, SelectUser, users } from "../schema/users";
import { database } from "../dbConnection";
import { eq } from "drizzle-orm";
import { userIndividualChat } from "../schema/userIndividual";

class UsersRepository implements IUsersRepository<InsertUser, SelectUser> {
  constructor(private readonly db: MySql2Database) {}
  getCurrentIndividual = async (userId: string): Promise<string> => {
    const result = await this.db
      .select({ individualName: userIndividualChat.individualName })
      .from(userIndividualChat)
      .where(eq(userIndividualChat.userId, userId));
    return result[0].individualName;
  };
  setIndividual = async (
    userId: string,
    individualName: string
  ): Promise<void> => {
    const userIndividual = await this.db
      .select()
      .from(userIndividualChat)
      .where(eq(userIndividualChat.userId, userId));
    if (!userIndividual[0]) {
      await this.db
        .insert(userIndividualChat)
        .values({ userId: userId, individualName: individualName });
    }
    await this.db
      .update(userIndividualChat)
      .set({ individualName: individualName })
      .where(eq(userIndividualChat.userId, userId));
  };
  updateUser = async (user: InsertUser): Promise<void> => {
    await this.db.update(users).set(user).where(eq(users.id, user.id));
  };
  getGoogleUser = async (email: string): Promise<SelectUser> => {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.googleEmail, email));
    return result[0];
  };
  getByGoogleSub = async (sub: string): Promise<SelectUser> => {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.googleSub, sub));
    return result[0];
  };
  addNew = async (user: InsertUser): Promise<void> => {
    await this.db.insert(users).values(user);
  };
  getByEmail = async (email: string): Promise<SelectUser> => {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email));
    return result[0];
  };
}
export const usersRepository = new UsersRepository(database);
