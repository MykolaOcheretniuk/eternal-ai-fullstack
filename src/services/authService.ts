import { IUsersRepository } from "@/db/IRepositories/IUsersRepository";
import { InsertUser, SelectUser } from "@/db/schema/users";
import { IAuthService } from "./IServices/IAuthService";
import { AuthRequest, GoogleUser, SessionUser } from "@/models/user";
import { usersRepository } from "@/db/repositories/UsersRepository";
import { UsersError } from "@/errors/UserErrors";
import passwordService from "@/utils/passwordService";
import { randomUUID } from "crypto";

class AuthService implements IAuthService {
  constructor(
    private readonly usersRepository: IUsersRepository<InsertUser, SelectUser>
  ) {}
  googleAuth = async ({
    googleEmail: email,
    googleSub,
    name,
  }: GoogleUser): Promise<SessionUser> => {
    const user = await this.usersRepository.getByGoogleSub(googleSub);
    if (!user) {
      const newUser: InsertUser = {
        email,
        passwordHash: null,
        id: randomUUID(),
        name: name ?? null,
        questions: 5,
        googleSub,
        googleEmail: email,
        phoneNumber: null,
      };
      await this.usersRepository.addNew(newUser);
      return Object.assign({}, user, {
        passwordHash: undefined,
      });
    }
    return Object.assign({}, user, { passwordHash: undefined });
  };
  signUp = async ({ email, password }: AuthRequest) => {
    const existingUser = await this.usersRepository.getByEmail(email);
    if (existingUser) {
      if (existingUser.passwordHash) {
        throw UsersError.AlreadyExists("User");
      }
    }
    const googleUser = await this.usersRepository.getGoogleUser(email);
    console.log(googleUser);
    const passwordHash = await passwordService.hashPassword(password);
    if (googleUser) {
      if (googleUser.passwordHash) {
        throw UsersError.AlreadyExists("User");
      }
      const updateUser = Object.assign({}, existingUser, {
        passwordHash: passwordHash,
      });
      return await this.usersRepository.updateUser(updateUser);
    }
    const newUser: InsertUser = {
      email: email,
      passwordHash: passwordHash,
      id: randomUUID(),
      name: null,
      questions: 5,
      phoneNumber: null,
    };
    await this.usersRepository.addNew(newUser);
  };
  login = async ({ email, password }: AuthRequest): Promise<SessionUser> => {
    const existingUser = await this.usersRepository.getByEmail(email);
    if (!existingUser) {
      throw UsersError.NotFound("User");
    }
    const { passwordHash } = existingUser;
    if (!passwordHash) {
      throw UsersError.NotFound("User");
    }
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
export const authService = new AuthService(usersRepository);
