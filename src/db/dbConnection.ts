import getEnv from "@/utils/getEnv";
import { drizzle } from "drizzle-orm/mysql2";
import * as mysql from "mysql2/promise";

const poolConnection = mysql.createPool({
  connectionLimit: 100,
  host: getEnv("DB_ENDPOINT"),
  user: getEnv("DB_USERNAME"),
  database: getEnv("DB_NAME"),
  password: getEnv("DB_PASSWORD"),
  port: parseInt(getEnv("DB_PORT") as string),
});

export const database = drizzle(poolConnection);
