import React from "react";

// PUBLIC_INTERFACE
/**
 * Displays the game status: next player, winner, or draw.
 * Props:
 *  - xIsNext: boolean
 *  - winner: string|null
 *  - isDraw: boolean
 */
export default function GameStatus({ xIsNext, winner, isDraw }) {
  let text;
  if (winner) {
    text = (
      <span>
        Winner:{" "}
        <span className={winner === "X" ? "ttt-x" : "ttt-o"}>{winner}</span>
      </span>
    );
  } else if (isDraw) {
    text = <span>It's a draw!</span>;
  } else {
    text = (
      <span>
        Current: Player{" "}
        <span className={xIsNext ? "ttt-x" : "ttt-o"}>
          {xIsNext ? "X" : "O"}
        </span>
      </span>
    );
  }

  return <div className="ttt-status">{text}</div>;
}
