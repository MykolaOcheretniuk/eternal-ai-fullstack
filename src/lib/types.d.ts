import { User } from "next-auth";
import { SessionUser } from "@/models/user";
declare module "next-auth" {
  interface Session {
    user: SessionUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: SessionUser;
  }
}
