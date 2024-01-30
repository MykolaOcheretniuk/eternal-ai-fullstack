import { MySql2Database } from "drizzle-orm/mysql2";
import { IRefreshTokensRepository } from "../IRepositories/IRefreshTokensRepository";
import {
  InsertRefreshToken,
  SelectRefreshToken,
  refreshTokens,
} from "../schema/tokens";
import { database } from "../dbConnection";
import { eq } from "drizzle-orm";

class RefreshTokensRepository
  implements IRefreshTokensRepository<InsertRefreshToken, SelectRefreshToken>
{
  constructor(private readonly db: MySql2Database) {}
  updateRefreshToken = async ({
    refreshToken,
    userId,
  }: InsertRefreshToken): Promise<void> => {
    await this.db
      .update(refreshTokens)
      .set({ refreshToken })
      .where(eq(refreshTokens.userId, userId));
  };
  addRefreshToken = async (token: InsertRefreshToken): Promise<void> => {
    await this.db.insert(refreshTokens).values(token);
  };
  getRefreshToken = async (userId: string): Promise<SelectRefreshToken> => {
    const existingToken = await this.db
      .select()
      .from(refreshTokens)
      .where(eq(refreshTokens.userId, userId));
    return existingToken[0];
  };
}
export const refreshTokensRepository = new RefreshTokensRepository(database);
