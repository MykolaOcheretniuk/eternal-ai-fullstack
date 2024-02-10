export interface IChatRepository<TInsert, TSelect> {
  createNew(chatLog: TInsert): Promise<void>;
  get(userId: string, limit: number, offset: number): Promise<TSelect[]>;
}
