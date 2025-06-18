import React, { useState } from 'react';

// PUBLIC_INTERFACE
/**
 * Main container for WebTicTacToe game.
 * Minimal, centered layout with light theme and specified colors.
 */
function WebTicTacToe() {
  // 3x3 board state, null | 'X' | 'O'
  const [board, setBoard] = useState(Array(9).fill(null));
  // 'X' always starts
  const [xIsNext, setXIsNext] = useState(true);
  // Track if game is over and winner info
  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(Boolean);

  // Handler for a move
  // PUBLIC_INTERFACE
  function handleSquareClick(idx) {
    if (board[idx] || winner) return; // no move if already filled or game ended
    const boardCopy = board.slice();
    boardCopy[idx] = xIsNext ? 'X' : 'O';
    setBoard(boardCopy);
    setXIsNext(!xIsNext);
  }

  // PUBLIC_INTERFACE
  function handleRestart() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  }

  // UI helpers
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "It's a draw!";
  } else {
    status = `Current: Player ${xIsNext ? 'X' : 'O'}`;
  }

  // CSS variables for color palette
  // --primary: #4CAF50, --secondary: #FFC107, --accent: #2196F3
  // Simple inline for self-containment, but recommend to move to CSS module for large projects.
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#f9f9f9',
    }}>
      <div
        style={{
          background: '#fff',
          borderRadius: '20px',
          boxShadow: '0 4px 24px rgba(40,60,80,0.08)',
          padding: '40px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minWidth: '320px',
        }}
      >
        <h2 style={{
          marginBottom: '4px',
          fontWeight: 700,
          fontSize: '2rem',
          color: '#4CAF50'
        }}>
          WebTicTacToe
        </h2>
        <div style={{
          fontSize: '1rem',
          color: '#2196F3',
          marginBottom: '18px',
          fontWeight: 500,
        }}>{status}</div>
        <GameBoard board={board} onSquareClick={handleSquareClick} winner={winner} />
        <button
          onClick={handleRestart}
          style={{
            marginTop: '24px',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '8px',
            background: '#FFC107',
            color: '#222',
            fontWeight: 600,
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(33, 150, 243, 0.07)',
            transition: 'background .15s'
          }}
        >
          Restart Game
        </button>
        <div style={{
          marginTop: '18px',
          color: '#aaa',
          fontSize: '0.95rem'
        }}>
          Player X = <span style={{color:'#4CAF50', fontWeight: 600}}>Green</span>, Player O = <span style={{color:'#2196F3', fontWeight: 600}}>Blue</span>
        </div>
      </div>
    </div>
  );
}

/**
 * GameBoard displays the 3x3 cells and handles clicks.
 */
function GameBoard({ board, onSquareClick, winner }) {
  // Helper render a single cell
  // PUBLIC_INTERFACE
  function renderCell(i) {
    const value = board[i];
    let color = value === 'X' ? '#4CAF50' : value === 'O' ? '#2196F3' : '#999';
    let highlight = false;
    // highlight win combination
    const winCombo = winner && Array.isArray(winner.cells) ? winner.cells : [];
    if (winCombo && winCombo.includes(i)) {
      highlight = true;
    }
    return (
      <button
        className="ttt-cell"
        key={i}
        onClick={() => onSquareClick(i)}
        style={{
          width: '64px',
          height: '64px',
          fontSize: '2.5rem',
          fontWeight: '700',
          background: highlight ? '#fffbe0' : '#f6f6f9',
          color: value ? color : '#aaa',
          border: '1px solid #dbe8ee',
          borderRadius: '10px',
          cursor: value || winner ? 'not-allowed' : 'pointer',
          outline: 'none',
          transition: 'background .2s, color .2s'
        }}
        disabled={!!value || !!winner}
      >{value}</button>
    );
  }

  // Render 3x3 grid
  return (
    <div
      className="ttt-board"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 64px)',
        gap: '12px',
        margin: '0 auto',
      }}>
      {board.map((_, i) => renderCell(i))}
    </div>
  );
}

/**
 * Calculate winner or return null.
 * If win occurs, return 'X' or 'O' and the win cells.
 * PUBLIC_INTERFACE
 */
function calculateWinner(squares) {
  const lines = [
    [0,1,2], [3,4,5], [6,7,8], // Rows
    [0,3,6], [1,4,7], [2,5,8], // Cols
    [0,4,8], [2,4,6]           // Diags
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a,b,c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return { winner: squares[a], cells: [a,b,c] };
    }
  }
  return null;
}

export default WebTicTacToe;
