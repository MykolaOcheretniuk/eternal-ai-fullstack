import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
import getEnv from "@/utils/getEnv";
dotenv.config();
export default {
  schema: "./src/db/schema",
  out: "./drizzle",
  driver: "mysql2",
  dbCredentials: {
    user: getEnv("DB_USERNAME"),
    password: getEnv("DB_PASSWORD"),
    host: getEnv("DB_ENDPOINT"),
    port: +getEnv("DB_PORT"),
    database: getEnv("DB_NAME"),
  },
} satisfies Config;
