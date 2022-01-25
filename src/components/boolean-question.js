import { useState } from "react";

export function BooleanQuestion({
  possibleAnswers,
  correctAnswer,
  onNextQuestion,
}) {
  const [isNextQuestionVisible, setIsNextQuestionVisible] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const userSelection = form.get("answer");
    const userSelectionEl = document.getElementById(userSelection);

    const isAnswerCorrect = JSON.parse(userSelection) === correctAnswer;

    if (isAnswerCorrect) userSelectionEl.style.color = "green";
    else userSelectionEl.style.color = "red";

    setIsAnswerCorrect(isAnswerCorrect);
    setIsNextQuestionVisible(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul style={{ listStyleType: "none" }}>
        <li id="true">
          <input type="radio" name="answer" value="true" required /> True
        </li>
        <li id="false">
          <input type="radio" name="answer" value="false" required /> False
        </li>
      </ul>

      {isNextQuestionVisible ? (
        <button onClick={() => onNextQuestion(isAnswerCorrect)}>next</button>
      ) : (
        <button type="submit">submit</button>
      )}
    </form>
  );
}
