import { create } from "zustand";

interface IsUserShouldBeUpdated {
  needToBeUpdated: boolean;
  setIsNeedToBeUpdated: (needToBeUpdated: boolean) => void;
}
export const useShouldUserBeUpdated = create<IsUserShouldBeUpdated>((set) => ({
  needToBeUpdated: false,
  setIsNeedToBeUpdated: (needToBeUpdated: boolean) =>
    set(() => ({ needToBeUpdated: needToBeUpdated })),
}));
