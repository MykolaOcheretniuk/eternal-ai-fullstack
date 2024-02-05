export interface IChatRepository<TInsert, TSelect> {
  createNew(chatLog: TInsert): Promise<void>;
}
