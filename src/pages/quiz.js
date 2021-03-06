import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

import { ProgressBar } from "../components/progress-bar";
import { getQuizData } from "../api/get-quiz-data";
import { SingleQuestion } from "../components/single-question";
import { MultiQuestion } from "../components/multi-question";
import { BooleanQuestion } from "../components/boolean-question";
import { Results } from "../components/results";

export default function Quiz() {
  const [quizData, setQuizData] = useState({ abswers: [], questions: [] });
  const [questionIndex, setQuestionIndex] = useState(0);
  const [roundState, setRoundState] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await getQuizData();

      setQuizData(response);
    })();
  }, []);

  const handleNextQuestionClick = (wasAnswerCorrect) => {
    if (questionIndex + 1 !== quizData.questions.length) {
      setQuestionIndex((prev) => prev + 1);
    }

    setRoundState((prev) => [...prev, { questionIndex, wasAnswerCorrect }]);
  };

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

  if (roundState.length === quizData.questions.length) {
    return <Results results={roundState} />;
  }

  return (
    <div>
      <ProgressBar
        questionIndex={questionIndex}
        questionAmount={quizData.questions.length}
      />
      <h2>{`${questionIndex + 1}) ${question}`}</h2>

      {questionType === "single" && (
        <SingleQuestion
          correctAnswer={correctAnswer}
          possibleAnswers={possibleAnswers}
          onNextQuestion={handleNextQuestionClick}
        />
      )}

      {questionType === "multiple" && (
        <MultiQuestion
          correctAnswer={correctAnswer}
          possibleAnswers={possibleAnswers}
          onNextQuestion={handleNextQuestionClick}
        />
      )}

      {questionType === "boolean" && (
        <BooleanQuestion
          orrectAnswer={correctAnswer}
          possibleAnswers={possibleAnswers}
          onNextQuestion={handleNextQuestionClick}
        />
      )}
    </div>
  );
}
