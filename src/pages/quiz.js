import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

import { ProgressBar } from "../components/progress-bar";
import { getQuizData } from "../api/get-quiz-data";
import { SingleQuestion } from "../components/single-question";

export default function Quiz() {
  const [quizData, setQuizData] = useState({ abswers: [], questions: [] });
  const [questionIndex, setQuestionIndex] = useState(0);

  useEffect(() => {
    (async () => {
      const response = await getQuizData();

      setQuizData(response);
    })();
  }, []);

  if (!quizData.questions.length)
    return (
      <div className="spinner">
        <Oval
          arialLabel="loading-indicator"
          height={100}
          width={100}
          strokeWidth={5}
          color="red"
          secondaryColor="yellow"
        />
      </div>
    );

  const { question, questionType, correctAnswer, possibleAnswers } = {
    question: quizData.questions.find(({ id }) => id === questionIndex + 1)
      .question,
    questionType: quizData.questions.find(({ id }) => id === questionIndex + 1)
      .type,
    possibleAnswers: quizData.questions.find(
      ({ id }) => id === questionIndex + 1
    )?.options,
    correctAnswer: quizData.answers.find(({ id }) => id === questionIndex + 1)
      .answer,
  };

  return (
    <div>
      <ProgressBar
        questionIndex={questionIndex}
        questionAmount={quizData.questions.length}
      />
      <h2>{question}</h2>

      {questionType === "single" && (
        <SingleQuestion
          correctAnswer={correctAnswer}
          possibleAnswers={possibleAnswers}
        />
      )}
    </div>
  );
}
