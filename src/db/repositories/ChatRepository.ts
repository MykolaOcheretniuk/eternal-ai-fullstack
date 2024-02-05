import { MySql2Database } from "drizzle-orm/mysql2";
import { IChatRepository } from "../IRepositories/IChatRepository";
import { ChatLogInsert, ChatLogSelect, chatLog } from "../schema/chatLog";
import { database } from "../dbConnection";

class ChatRepository implements IChatRepository<ChatLogInsert, ChatLogSelect> {
  constructor(private readonly db: MySql2Database) {}
  createNew = async (insertChatLog: ChatLogInsert): Promise<void> => {
    await this.db.insert(chatLog).values(insertChatLog);
  };
}
export const chatRepository = new ChatRepository(database);
