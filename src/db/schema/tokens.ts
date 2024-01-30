import { mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { users } from "./users";

export const refreshTokens = mysqlTable("RefreshTokens", {
  userId: varchar("UserId", { length: 70 })
    .notNull()
    .references(() => users.id),
  refreshToken: varchar("RefreshToken", { length: 250 }).notNull(),
});
export type SelectRefreshToken = typeof refreshTokens.$inferSelect;
export type InsertRefreshToken = typeof refreshTokens.$inferInsert;
