import { useState } from "react";

import { ContextMenu } from "../components/context-menu";

const initialContextMenuState = {
  open: false,
  x: null,
  y: null,
};

export function HistoryItem({
  data: { date, results },
  index,
  handleItemRemoval,
}) {
  const [contextMenuState, setContextMenuState] = useState(
    initialContextMenuState
  );

  const score = results.reduce(
    (acc, c) => (c.wasAnswerCorrect ? acc + 1 : acc),
    0
  );

  const handleContextMenu = (e) => {
    e.preventDefault();

    setContextMenuState({ open: true, x: e.clientX, y: e.clientY });
  };

  return (
    <div className="history-item" onContextMenu={handleContextMenu}>
      <span>{index + 1}. </span>
      <span>{new Date(date).toLocaleString()}</span>
      <span>
        score: {score}/{results.length}
      </span>

      <ContextMenu
        {...contextMenuState}
        onRemove={() => handleItemRemoval(date)}
        handleOutsideClick={() => setContextMenuState(initialContextMenuState)}
      />
    </div>
  );
}
