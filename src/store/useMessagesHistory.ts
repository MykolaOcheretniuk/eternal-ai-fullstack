import { Message } from "@/models/message";
import { create } from "zustand";

interface MessagesHistory {
  messages: Message[];
  updateMessages: (messages: Message[]) => void;
}
export const useMessagesHistory = create<MessagesHistory>((set) => ({
  messages: [],
  updateMessages: (messages: Message[]) => set(() => ({ messages: messages })),
}));
