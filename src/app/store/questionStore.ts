import { create } from "zustand";

interface IQuestionState {
  current: number;
  correct: number;
  reset: () => void;
}

export const useQuestionStore = create<IQuestionState>()((set) => ({
  current: 0,
  correct: 0,
  reset: () => set({ current: 0, correct: 0 }),
}));
