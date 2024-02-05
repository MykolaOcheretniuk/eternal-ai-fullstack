import { SelectSubscriber } from "../schema/subscribers";

export interface ISubscribersRepository<TInsert, TSelect> {
  get(userId: string): Promise<TSelect>;
  add(subscriber: TInsert): Promise<void>;
  update(subscriber: TInsert): Promise<void>;
  delete(customerId: string): Promise<void>;
}
