export interface IUsersRepository<TInsert, TSelect> {
  addNew(user: TInsert): Promise<void>;
  getByEmail(email: string): Promise<TSelect>;
  getGoogleUser(email: string): Promise<TSelect>;
  getByGoogleSub(sub: string): Promise<TSelect>;
  updateUser(user: TInsert): Promise<void>;
  setIndividual(userId: string, individualName: string): Promise<void>;
  getCurrentIndividual(userId: string): Promise<string>;
}
