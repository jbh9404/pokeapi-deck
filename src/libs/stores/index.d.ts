export interface LoadingState {
  isLoading: boolean;
  off: () => void;
  on: () => void;
}
