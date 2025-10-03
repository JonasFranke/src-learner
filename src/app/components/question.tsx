"use client";

import { useEffect, useState } from "react";
import { useQuestionStore } from "@/store/questionStore";

type Answer = {
  answer: string;
  id: number;
  correct?: true;
};

interface QuestionProps {
  question: string;
  answers: string[];
  correctAnswer: number;
}

function randomizeAnswers(answers: string[]): Answer[] {
  const answerWithIds: Answer[] = answers.map((a, i) => ({
    answer: a,
    id: i,
    correct: i === 0 ? true : undefined,
  }));

  const shuffledAnswers: Answer[] = answerWithIds.sort(
    () => Math.random() - 0.5,
  );
  return shuffledAnswers;
}

export default function Question({
  question,
  answers,
  correctAnswer,
}: QuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [wrongAnswer, setWrongAnsert] = useState(false);
  const [randomAnswers, setRandomAnswers] = useState<Answer[] | undefined>();

  const handleChange = (index: number) =>
    setSelectedAnswer(index === selectedAnswer ? null : index);

  useEffect(() => {
    setRandomAnswers(randomizeAnswers(answers));
  }, [answers]);

  const state = useQuestionStore((state) => state);
  const current = useQuestionStore((state) => state.current);
  const correct = useQuestionStore((state) => state.correct);
  const correctAnswered = useQuestionStore((state) => state.correctAnswered);

  return (
    <div className="p-4 border rounded-md my-4 mx-2">
      <div className="flex justify-between">
        <h1 className="font-bold">
          Frage {state.current + 1}: {question}
        </h1>
        <h1 className="">Korrekt: {correct}</h1>
      </div>
      <ul>
        {randomAnswers?.map((a) => (
          <li key={a.id}>
            <input
              type="checkbox"
              className="m-2"
              value={a.answer}
              checked={selectedAnswer === a.id}
              onChange={() => {
                handleChange(a.id);
                console.log(selectedAnswer);
              }}
            />
            {a.answer}
          </li>
        ))}
      </ul>
      <div className="flex items-center">
        <button
          type="submit"
          className="border bg-cyan-950 border-cyan-900 rounded-md m-2 p-0.5"
          onClick={() => {
            if (selectedAnswer === correctAnswer) {
              console.log("Correct");
              console.log(correctAnswered);
              useQuestionStore.setState({
                correctAnswered: useQuestionStore
                  .getState()
                  .correctAnswered.concat([current]),
              });
              console.log(correctAnswered);
              useQuestionStore.setState({ current: current + 1 });
              useQuestionStore.setState({ correct: correct + 1 });
              setSelectedAnswer(null);
              setWrongAnsert(false);
              useQuestionStore
                .getState()
                .saveState(current, correct, correctAnswered);
            } else {
              setWrongAnsert(true);
            }
          }}
        >
          Check
        </button>
        <button
          type="submit"
          className="border bg-cyan-950 border-red-600 rounded-md m-2 p-0.5"
          onClick={() => {
            useQuestionStore.getState().reset();
            setWrongAnsert(false);
          }}
        >
          Reset
        </button>
        {wrongAnswer ? <p className="text-red-600 text-xl">Falsch</p> : null}
      </div>
    </div>
  );
}
