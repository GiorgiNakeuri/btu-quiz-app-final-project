import { useState } from "react";

export function SingleQuestion({
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

    const isAnswerCorrect = +userSelection === correctAnswer;

    if (isAnswerCorrect) userSelectionEl.style.color = "green";
    else userSelectionEl.style.color = "red";

    setIsAnswerCorrect(isAnswerCorrect);
    setIsNextQuestionVisible(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul style={{ listStyleType: "none" }}>
        {possibleAnswers.map((answer, index) => (
          <li key={index} id={index + 1}>
            <input type="radio" name="answer" value={index + 1} required />
            {answer}
          </li>
        ))}
      </ul>

      {isNextQuestionVisible ? (
        <button onClick={() => onNextQuestion(isAnswerCorrect)}>next</button>
      ) : (
        <button type="submit">submit</button>
      )}
    </form>
  );
}
