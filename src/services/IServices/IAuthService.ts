import { AuthRequest, GoogleUser, SessionUser } from "@/models/user";

export interface IAuthService {
  signUp(model: AuthRequest): Promise<void>;
  login(model: AuthRequest): Promise<SessionUser>;
  googleAuth(model: GoogleUser): Promise<SessionUser>;
}
