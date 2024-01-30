import { TokensResponse } from "@/models/tokens";
import { AuthRequest, SessionUser } from "@/models/user";

export interface IUsersService {
  signUp(model: AuthRequest): Promise<void>;
  login(model: AuthRequest): Promise<SessionUser>;
}
