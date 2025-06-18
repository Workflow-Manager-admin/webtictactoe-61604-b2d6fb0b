import React from "react";
import Square from "./Square";

// PUBLIC_INTERFACE
/**
 * Renders the 3x3 Tic Tac Toe board.
 * Props:
 *   - board: array of cell values ('X','O',null)
 *   - onSquareClick: function(idx)
 *   - winningLine: array of indices, highlights win
 */
export default function Board({ board, onSquareClick, winningLine }) {
  // PUBLIC_INTERFACE
  function renderSquare(i) {
    return (
      <Square
        key={i}
        value={board[i]}
        onClick={() => onSquareClick(i)}
        highlight={winningLine && winningLine.includes(i)}
        disabled={Boolean(board[i])}
      />
    );
  }

  // 3 rows, 3 columns
  return (
    <div className="ttt-board">
      {[0, 1, 2].map((row) => (
        <div className="ttt-board-row" key={row}>
          {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
        </div>
      ))}
    </div>
  );
}
