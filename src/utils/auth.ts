import type { Account, AuthOptions, Profile } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import getEnv from "./getEnv";
import { authService } from "@/services/authService";
import { SessionUser } from "@/models/user";

export const authConfig: AuthOptions = {
  pages: {
    signIn: "/?action=signIn",
  },
  providers: [
    GoogleProvider({
      clientId: getEnv("GOOGLE_CLIENT_ID"),
      clientSecret: getEnv("GOOGLE_CLIENT_SECRET"),
      profile: async (profile) => {
        const { sub, email, name } = profile;
        const user = await authService.googleAuth({
          googleSub: sub,
          googleEmail: email,
          name,
        });
        return user;
      },
    }),
    Credentials({
      credentials: {
        email: { label: "email", type: "email", required: true },
        password: { label: "password", type: "password", required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const email = credentials?.email as string;
        const password = credentials?.password as string;
        const sessionUser = await authService.login({ email, password });
        return sessionUser;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user as SessionUser;
      }
      return token;
    },
    async session({ token, session }) {
      session.user = token.user as SessionUser;
      return session;
    },
  },
  secret: getEnv("NEXTAUTH_SECRET"),
};
