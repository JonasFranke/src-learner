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
  saveState: () => void;
}

const saveState = (get: () => IQuestionState) => {
  const { current, correct, correctAnswered } = get();
  const state: State = { correct, correctAnswered, current };
  localStorage.setItem("quizState", JSON.stringify(state));
};

export const useQuestionStore = create<IQuestionState>()((set, get) => ({
  correct: 0,
  correctAnswered: [],
  current: 0,
  loadState: () => {
    const savedState = localStorage.getItem("quizState");
    if (savedState) {
      const { current, correct, correctAnswered }: State =
        JSON.parse(savedState);
      set({ correct, correctAnswered, current });
    }
  },
  reset: () => {
    set({ correct: 0, current: 0 });
    localStorage.removeItem("quizState");
    saveState(get);
  },
  saveState: () => saveState(get),
}));
