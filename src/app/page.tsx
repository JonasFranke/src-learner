"use client";
import { useEffect } from "react";
import Question from "./components/question";
import questionsData from "./data/questions.json";
import { useQuestionStore } from "./store/questionStore";

type QuestionType = {
  question: string;
  answers: string[];
  correct: number;
};

export default function Home() {
  const questions: QuestionType[] = questionsData;
  const limit = questions.length;
  const current = useQuestionStore((state) => state.current);

  const loadState = useQuestionStore((state) => state.loadState);
  const saveState = useQuestionStore((state) => state.saveState);

  useEffect(() => {
    if (localStorage.getItem("quizState")) {
      loadState();
    } else {
      saveState(0, 0, []);
    }
  }, [loadState, saveState]);

  return (
    <div>
      <h1>SRC Fragenlerner</h1>

      {current < limit ? (
        <Question
          question={questions[current].question}
          answers={questions[current].answers}
          correctAnswer={questions[current].correct}
        />
      ) : undefined}
    </div>
  );
}
