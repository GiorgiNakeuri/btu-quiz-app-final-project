import { useState } from "react";

export function MultiQuestion({
  possibleAnswers,
  correctAnswer,
  onNextQuestion,
}) {
  const [isNextQuestionVisible, setIsNextQuestionVisible] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [answerState, setAnswerState] = useState({});

  const handleInputChange = (e) => {
    setAnswerState((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let isAnswerCorrect = true;

    Object.entries(answerState).forEach(([id, value]) => {
      if (correctAnswer.includes(id) && !value) isAnswerCorrect = false;

      correctAnswer.forEach((id) => {
        if (!answerState[id]) isAnswerCorrect = false;
      });
    });

    if (isAnswerCorrect) e.target.style.color = "green";
    else e.target.style.color = "red";

    setIsAnswerCorrect(isAnswerCorrect);
    setIsNextQuestionVisible(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul style={{ listStyleType: "none" }}>
        {possibleAnswers.map((answer, index) => (
          <li key={index} id={index + 1}>
            <input
              type="checkbox"
              name={index + 1}
              value={index + 1}
              onChange={handleInputChange}
            />
            {answer}
          </li>
        ))}
      </ul>

      {isNextQuestionVisible ? (
        <button onClick={() => onNextQuestion(isAnswerCorrect)}>next</button>
      ) : (
        <button
          type="submit"
          disabled={Object.values(answerState).every((value) => !value)}
        >
          submit
        </button>
      )}
    </form>
  );
}
