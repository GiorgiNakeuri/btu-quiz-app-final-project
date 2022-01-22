import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";

import { ProgressBar } from "../components/progress-bar";
import { getQuizData } from "../api/get-quiz-data";

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

  return (
    <div>
      <ProgressBar
        questionIndex={questionIndex}
        questionAmount={quizData.questions.length}
      />
    </div>
  );
}
