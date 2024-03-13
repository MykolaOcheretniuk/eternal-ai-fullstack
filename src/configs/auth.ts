import { BASE_URL, HEADERS } from "@/constants/api";
import { SessionUser } from "@/models/user";
import getEnv from "@/utils/getEnv";
import type { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
export const authConfig: AuthOptions = {
  pages: {
    signIn: "/?action=signIn",
    error: "/?action=signIn",
  },
  providers: [
    GoogleProvider({
      clientId: getEnv("GOOGLE_CLIENT_ID"),
      clientSecret: getEnv("GOOGLE_CLIENT_SECRET"),
      profile: async (profile) => {
        console.log(profile);
        return profile;
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
        const authResponse = await fetch(`${BASE_URL}/log-in`, {
          method: "POST",
          headers: HEADERS,
          body: JSON.stringify({ email, password }),
        });
        if (!authResponse.ok) {
          const { message } = await authResponse.json();
          throw new Error(message);
        }
        const { token, userInfo: user } = await authResponse.json();
        return { token, user } as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = user as unknown as SessionUser;
      }
      if (trigger === "update") {
        token.user = session.user as SessionUser;
        return token;
      }
      return token;
    },
    async session({ token, session, trigger }) {
      session.user = token.user as SessionUser;
      return session;
    },
  },
  secret: getEnv("NEXTAUTH_SECRET"),
};
