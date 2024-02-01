import { IUsersRepository } from "@/db/IRepositories/IUsersRepository";
import { InsertUser, SelectUser } from "@/db/schema/users";
import { IUsersService } from "./IServices/IUsersService";
import { AuthRequest, GoogleUser, SessionUser } from "@/models/user";
import { usersRepository } from "@/db/repositories/UsersRepository";
import { UsersError } from "@/errors/UserErrors";
import passwordService from "@/utils/passwordService";
import { randomUUID } from "crypto";

class UsersService implements IUsersService {
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
        phoneNumber: null,
      };
      await this.usersRepository.addNew(newUser);
      return Object.assign({}, user, {
        passwordHash: undefined,
      });
    }
    return Object.assign({}, user, { passwordHash: undefined });
  };
  addNewFromGoogle = async ({
    googleEmail: email,
    googleSub,
    name,
  }: GoogleUser): Promise<void> => {
    const user = await this.usersRepository.getByGoogleSub(googleSub);
    if (!user) {
      const newUser: InsertUser = {
        email: email,
        passwordHash: null,
        id: randomUUID(),
        name,
        questions: 5,
        googleSub,
        phoneNumber: null,
      };
      await this.usersRepository.addNew(newUser);
    }
  };
  signUp = async ({ email, password }: AuthRequest) => {
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
export const usersService = new UsersService(usersRepository);
