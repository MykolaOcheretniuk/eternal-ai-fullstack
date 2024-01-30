import { MySql2Database } from "drizzle-orm/mysql2";
import { IUsersRepository } from "../IRepositories/IUsersRepository";
import { InsertUser, SelectUser } from "../schema/users";
import { database } from "../dbConnection";

class UsersRepository implements IUsersRepository<InsertUser, SelectUser> {
  constructor(private readonly db: MySql2Database) {}
  addNew = async (user: InsertUser): Promise<void> => {
    throw new Error("Method not implemented.");
  };
  getByEmail = async (email: string): Promise<SelectUser> => {
    throw new Error("Method not implemented.");
  };
}
export const usersRepository = new UsersRepository(database);
