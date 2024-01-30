export interface IRefreshTokensRepository<TInsert, TSelect> {
  addRefreshToken(token: TInsert): Promise<void>;
  updateRefreshToken(token: TInsert): Promise<void>;
  getRefreshToken(userId: string): Promise<TSelect>;
}
