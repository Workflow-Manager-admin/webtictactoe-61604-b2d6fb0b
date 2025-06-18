import React from "react";

// PUBLIC_INTERFACE
/**
 * Single Tic Tac Toe square.
 * Props:
 *   - value: 'X', 'O', or null
 *   - onClick: handler
 *   - highlight: boolean (winning square highlight)
 *   - disabled: boolean (disable click)
 */
export default function Square({ value, onClick, highlight, disabled }) {
  let extraClass = "";
  if (highlight) extraClass += " ttt-square-highlight";
  let colorClass = value === "X" ? "ttt-x" : value === "O" ? "ttt-o" : "";

  return (
    <button
      className={`ttt-square${extraClass} ${colorClass}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={value ? `Cell ${value}` : "Cell"}
      tabIndex={0}
    >
      {value}
    </button>
  );
}
