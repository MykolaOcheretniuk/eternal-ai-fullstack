import { MySql2Database } from "drizzle-orm/mysql2";
import { IUsersRepository } from "../IRepositories/IUsersRepository";
import { InsertUser, SelectUser, users } from "../schema/users";
import { database } from "../dbConnection";
import { eq } from "drizzle-orm";

class UsersRepository implements IUsersRepository<InsertUser, SelectUser> {
  constructor(private readonly db: MySql2Database) {}
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
