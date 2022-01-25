// https:github.com/GiorgiNakeuri/eAcademy-context-menu/blob/master/src/ContextMenu.js

export function ContextMenu({ x, y, open, onRemove, handleOutsideClick }) {
  if (!open) return null;

  return (
    <div className="outside-click-listener" onClick={handleOutsideClick}>
      <div
        className="context-menu"
        style={{ top: y, left: x }}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onRemove}>remove</button>
      </div>
    </div>
  );
}
