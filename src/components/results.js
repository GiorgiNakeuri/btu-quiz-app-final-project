import { useNavigate } from "react-router-dom";

export function Results({ results }) {
  const navigate = useNavigate();

  const handleTryAgain = (e) => {
    if (window.confirm("Do you want to save this attempt?")) {
      const previousAttempts = JSON.parse(
        localStorage.getItem("quizHistory") || "[]"
      );

      localStorage.setItem(
        "quizHistory",
        JSON.stringify([...previousAttempts, { date: new Date(), results }])
      );
    }

    navigate("/");
  };

  return (
    <div>
      <p>
        your score:{" "}
        {`${Object.values(results).reduce(
          (acc, c) => (c.wasAnswerCorrect ? acc + 1 : acc),
          0
        )}/${results.length}`}
      </p>
      <button onClick={handleTryAgain}>try again</button>
      <button onClick={() => navigate("/history")}>see attempts history</button>
    </div>
  );
}
