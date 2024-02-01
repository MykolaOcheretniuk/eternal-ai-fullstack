import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("Users", {
  id: varchar("Id", { length: 70 }).notNull().primaryKey(),
  name: varchar("Name", { length: 100 }),
  email: varchar("Email", { length: 100 }).notNull(),
  passwordHash: varchar("PasswordHash", { length: 256 }),
  phoneNumber: varchar("PhoneNumber", { length: 100 }),
  googleSub: varchar("GoogleSub", { length: 256 }),
  questions: int("Questions").notNull(),
});
export type SelectUser = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
