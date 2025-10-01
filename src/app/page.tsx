"use client";
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
  const current = useQuestionStore((state) => state.current);

  return (
    <div>
      <h1>SRC Fragenlerner</h1>

      <Question
        question={questions[current].question}
        answers={questions[current].answers}
        correctAnswer={questions[current].correct}
      />
    </div>
  );
}
