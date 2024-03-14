import { create } from "zustand";

interface IsPopUpOpenState {
  isOpened: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
export const useIsPopUpOpen = create<IsPopUpOpenState>((set) => ({
  isOpened: false,
  setIsOpen: (isOpen: boolean) => set(() => ({ isOpened: isOpen })),
}));
