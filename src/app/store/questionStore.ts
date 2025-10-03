import { create } from "zustand";

type State = {
  current: number;
  correct: number;
  correctAnswered: number[];
};

interface IQuestionState {
  current: number;
  correct: number;
  correctAnswered: number[];
  reset: () => void;
  loadState: () => void;
  saveState: (
    current: number,
    correct: number,
    correctAnswered: number[],
  ) => void;
}

export const useQuestionStore = create<IQuestionState>()((set) => ({
  current: 0,
  correct: 0,
  correctAnswered: [],
  reset: () => {
    set({ current: 0, correct: 0 });
    localStorage.removeItem("quizState");
  },
  loadState: () => {
    const savedState = localStorage.getItem("quizState");
    if (savedState) {
      const { current, correct, correctAnswered }: State =
        JSON.parse(savedState);
      set({ current, correct, correctAnswered });
    }
  },
  saveState: (current: number, correct: number, correctAnswered: number[]) => {
    const state: State = { current, correct, correctAnswered };
    localStorage.setItem("quizState", JSON.stringify(state));
  },
}));
