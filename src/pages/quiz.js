import { useEffect, useState } from "react";

import { ProgressBar } from "../components/progress-bar";
import { getQuizData } from "../api/get-quiz-data";

export default function Quiz() {
  const [quizData, setQuizData] = useState({ abswers: [], questions: [] });
  const [questionIndex, setQuestionIndex] = useState(0);

  useEffect(() => {
    (async () => {
      getQuizData().then((data) => setQuizData(data));
    })();
  }, []);

  return (
    <div>
      <ProgressBar
        questionIndex={questionIndex}
        questionAmount={quizData.questions.length}
      />
    </div>
  );
}
