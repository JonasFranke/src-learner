"use client";

import { useState } from "react";
import { useQuestionStore } from "@/store/questionStore";

interface QuestionProps {
  question: string;
  answers: string[];
  correctAnswer: number;
}

export default function Question({
  question,
  answers,
  correctAnswer,
}: QuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [wrongAnswer, setWrongAnsert] = useState(false);

  const handleChange = (index: number) =>
    setSelectedAnswer(index === selectedAnswer ? null : index);

  const current = useQuestionStore((state) => state.current);
  const correct = useQuestionStore((state) => state.correct);

  return (
    <div className="p-4 border rounded-md my-4 mx-2">
      <div className="flex justify-between">
        <h1 className="font-bold">
          Frage {current + 1}: {question}
        </h1>
        <h1 className="">Korrekt: {correct}</h1>
      </div>
      <ul>
        {answers.map((a, i) => (
          <li key={a}>
            <input
              type="checkbox"
              className="m-2"
              value={a}
              checked={selectedAnswer === i}
              onChange={() => {
                handleChange(i);
                console.log(selectedAnswer);
              }}
            />
            {a}
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
              useQuestionStore.setState({ current: current + 1 });
              useQuestionStore.setState({ correct: correct + 1 });
              setSelectedAnswer(null);
              setWrongAnsert(false);
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
