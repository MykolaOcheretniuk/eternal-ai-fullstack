import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { users } from "./users";

export const subscribers = mysqlTable("Subscribers", {
  userId: varchar("UserId", { length: 70 })
    .notNull()
    .references(() => users.id),
  stripeSubId: varchar("StripeSubId", { length: 100 }).notNull(),
  stripeCustomerId: varchar("StripeCustomerId", { length: 100 }).notNull(),
  nextPaymentDate: int("nextPaymentDate").notNull(),
});
