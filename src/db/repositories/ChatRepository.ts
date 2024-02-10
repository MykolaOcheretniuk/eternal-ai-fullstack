import { MySql2Database } from "drizzle-orm/mysql2";
import { IChatRepository } from "../IRepositories/IChatRepository";
import { ChatLogInsert, ChatLogSelect, chatLog } from "../schema/chatLog";
import { database } from "../dbConnection";
import { eq } from "drizzle-orm";

class ChatRepository implements IChatRepository<ChatLogInsert, ChatLogSelect> {
  constructor(private readonly db: MySql2Database) {}
  get = async (
    userId: string,
    limit: number,
    offset: number
  ): Promise<ChatLogSelect[]> => {
    const result = await this.db
      .select()
      .from(chatLog)
      .where(eq(chatLog.userId, userId))
      .limit(limit)
      .offset(offset);
    return result;
  };
  createNew = async (insertChatLog: ChatLogInsert): Promise<void> => {
    await this.db.insert(chatLog).values(insertChatLog);
  };
}
export const chatRepository = new ChatRepository(database);
