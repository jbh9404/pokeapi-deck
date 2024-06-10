import { create } from "zustand";
import { LoadingState } from "./index.d";

// interface LoadingState {
//   isLoading: boolean;
//   off: () => void;
//   on: () => void;
// }

export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  off: () => set(() => ({ isLoading: false })),
  on: () => set(() => ({ isLoading: true })),
}));
