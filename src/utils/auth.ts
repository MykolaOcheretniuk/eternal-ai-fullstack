import type { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import getEnv from "./getEnv";
import { usersService } from "@/services/usersService";

export const authConfig: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: getEnv("GOOGLE_CLIENT_ID"),
      clientSecret: getEnv("GOOGLE_CLIENT_SECRET"),
    }),
    Credentials({
      credentials: {
        email: { label: "email", type: "email", required: true },
        password: { label: "password", type: "password", required: true },
      },
      async authorize(credentials) {
        if (credentials?.email || credentials?.password) {
          return null;
        }
        const email = credentials?.email as string;
        const password = credentials?.password as string;
        const sessionUser = await usersService.login({ email, password });
        return sessionUser;
      },
    }),
  ],
};
