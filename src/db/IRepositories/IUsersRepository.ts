export interface IUsersRepository<TInsert, TSelect> {
  addNew(user: TInsert): Promise<void>;
  getByEmail(email: string): Promise<TSelect>;
  getByGoogleSub(sub: string): Promise<TSelect>;
}
