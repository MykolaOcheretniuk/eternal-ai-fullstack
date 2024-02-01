import { AuthRequest, GoogleUser, SessionUser } from "@/models/user";

export interface IUsersService {
  signUp(model: AuthRequest): Promise<void>;
  login(model: AuthRequest): Promise<SessionUser>;
  addNewFromGoogle(model: GoogleUser): Promise<void>;
  googleAuth(model: GoogleUser): Promise<SessionUser>;
}
