import { useState, useEffect } from "react";

import { HistoryItem } from "../components/history-item";

export default function History() {
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

  if (!history.length) return <p>no history</p>;

  return (
    <div>
      <h2>history</h2>
      {history.map((data, i) => (
        <HistoryItem
          data={data}
          key={data.date}
          index={i}
          handleItemRemoval={handleItemRemoval}
        />
      ))}
    </div>
  );
}
