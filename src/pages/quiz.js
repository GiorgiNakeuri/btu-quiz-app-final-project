import { useEffect, useState } from "react";
import { getQuizData } from "../api/get-quiz-data";

export default function Quiz() {
  const [quizData, setQuizData] = useState();

  useEffect(() => {
    (async () => {
      getQuizData().then((data) => setQuizData(data));
    })();
  }, []);

  console.log(quizData);
  return <p>Quiz</p>;
}
