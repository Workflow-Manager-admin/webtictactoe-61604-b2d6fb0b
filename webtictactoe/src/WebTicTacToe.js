import React, { useState } from "react";
import Board from "./Board";
import GameStatus from "./GameStatus";
import "./WebTicTacToe.css";

// PUBLIC_INTERFACE
/**
 * Main container for the WebTicTacToe game.
 * Handles game state, win/draw logic, and layout.
 */
export default function WebTicTacToe() {
  // 3x3 board: each cell is 'X', 'O', or null
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  // Returns 'X'/'O' if win, null otherwise; {winner, line}
  const winnerObj = calculateWinner(board);
  const winner = winnerObj?.winner || null;
  const winningLine = winnerObj?.line || [];
  const isDraw = !winner && board.every(Boolean);

  // PUBLIC_INTERFACE
  function handleSquareClick(idx) {
    if (board[idx] || winner) return;
    const boardCopy = board.slice();
    boardCopy[idx] = xIsNext ? "X" : "O";
    setBoard(boardCopy);
    setXIsNext((prev) => !prev);
  }

  // PUBLIC_INTERFACE
  function handleRestart() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div className="ttt-outer">
      <div className="ttt-container">
        <h2 className="ttt-title">WebTicTacToe</h2>
        <GameStatus xIsNext={xIsNext} winner={winner} isDraw={isDraw} />
        <Board board={board} onSquareClick={handleSquareClick} winningLine={winningLine} />
        <button className="ttt-btn" onClick={handleRestart}>
          Restart Game
        </button>
        <div className="ttt-legend">
          Player <span className="ttt-x">X</span> = Green,&nbsp;
          Player <span className="ttt-o">O</span> = Blue
        </div>
      </div>
    </div>
  );
}

/**
 * Returns { winner: 'X' | 'O', line: [cell indices] } if win, or null for no win.
 * PUBLIC_INTERFACE
 */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}
