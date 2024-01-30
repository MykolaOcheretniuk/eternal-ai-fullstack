import { IUsersRepository } from "@/db/IRepositories/IUsersRepository";
import { InsertUser, SelectUser } from "@/db/schema/users";
import { IUsersService } from "./IServices/IUsersService";
import { TokensResponse } from "@/models/tokens";
import { AuthRequest, SessionUser } from "@/models/user";
import { usersRepository } from "@/db/repositories/UsersRepository";
import { UsersError } from "@/errors/UserErrors";
import passwordService from "@/utils/passwordService";
import jwtTokensService from "@/utils/tokensService";
import { refreshTokensRepository } from "@/db/repositories/RefreshTokensRepository";
import { randomUUID } from "crypto";

class UsersService implements IUsersService {
  constructor(
    private readonly usersRepository: IUsersRepository<InsertUser, SelectUser>
  ) {}
  signUp = async (model: AuthRequest) => {
    const { email, password } = model;
    const existingUser = await this.usersRepository.getByEmail(email);
    if (existingUser) {
      throw UsersError.AlreadyExists("User");
    }
    const passwordHash = await passwordService.hashPassword(password);
    const newUser: InsertUser = {
      email: email,
      passwordHash: passwordHash,
      id: randomUUID(),
      name: null,
      questions: 5,
      phoneNumber: null,
    };
    await usersRepository.addNew(newUser);
  };
  login = async (model: AuthRequest): Promise<SessionUser> => {
    const { email, password } = model;
    const existingUser = await usersRepository.getByEmail(email);
    if (!existingUser) {
      throw UsersError.NotFound("User");
    }
    const { passwordHash } = existingUser;
    const isPasswordCorrect = await passwordService.validatePassword(
      password,
      passwordHash
    );
    if (!isPasswordCorrect) {
      throw UsersError.WrongPassword();
    }
    return Object.assign({}, existingUser, { passwordHash: undefined });
  };
}
export const usersService = new UsersService(usersRepository);
