import { SelectUser } from "@/db/schema/users";

export interface AuthRequest {
  email: string;
  password: string;
}
export interface GoogleUser {
  googleEmail: string;
  googleSub: string;
  name: string | null;
}
export interface UpdateUser {
  email: string | null;
  phoneNumber: string | null;
  name: string | null;
  password: string | null;
}
export interface SessionUser extends Omit<SelectUser, "passwordHash"> {}
