import { useState, useEffect } from "react";

import { HistoryItem } from "../components/history-item";

export default function Home() {
  const [history, setHistory] = useState(() =>
    JSON.parse(localStorage.getItem("quizHistory") || "[]")
  );

  useEffect(
    () => localStorage.setItem("quizHistory", JSON.stringify(history)),
    [history]
  );

  const handleItemRemoval = (date) => {
    setHistory((prev) => prev.filter((item) => item.date !== date));
  };

  return (
    <div>
      <h2>Last Attempt</h2>

      {history.length > 0 ? (
        <HistoryItem
          data={history[0]}
          index={0}
          handleItemRemoval={handleItemRemoval}
        />
      ) : (
        <p>no attempt found</p>
      )}
    </div>
  );
}
