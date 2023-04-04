import { create } from "zustand";

export const useLoadingStore = create((set) => ({
  isLoading: false,
  off: () => set(() => ({ isLoading: false })),
  on: () => set(() => ({ isLoading: true })),
}));
