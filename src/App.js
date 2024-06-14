import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button
      className="square"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({squares, handleClick}) {
  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [currentMove, setCurrentMove] = useState(0);
  let player = (currentMove % 2 === 0) ? 'X' : 'O';
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [status, setStatus] = useState('First Player: ' + player);
  const [finalMove, setFinalMove] = useState(9);

  const currentSquares = history[currentMove];

  function handleClick(i) {
    // Do nothing if the square has been filled or the game is over
    if (currentSquares[i] || currentMove === finalMove) {
      return;
    }

    // Otherwise fill the square
    const nextSquares = currentSquares.slice();
    nextSquares[i] = player;
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    // Make sure the game isn't over
    if (isWinningPlay(nextSquares, i)) {
      setStatus('Winner: ' + player);
      setFinalMove(currentMove + 1);
    } else {
      player = (player === 'O') ? 'X': 'O';
      setStatus('Next Player: ' + player);
      setFinalMove(9);
    }
  }

  function jumpTo(nextMove) {
    if (currentMove === nextMove) {
      return;
    }
    player = (nextMove % 2 === 0) ? 'X' : 'O';
    if (nextMove === finalMove) {
      player = ((nextMove - 1) % 2 === 0) ? 'X' : 'O';
      setStatus('Player ' + player + ' won!');
    } else if (nextMove === 0) {
      setStatus('First Player: ' + player);
    } else {
      setStatus('Next Player: ' + player);
    }
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description = (move > 0)
      ? 'Go to move #' + move
      : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className='game'>
      <div>
        <div className='status'>{status}</div>
        <Board squares={currentSquares} handleClick={handleClick} />
      </div>
      <div className='game-info'>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function isWinningPlay(squares, index) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (const line of lines) {
    if (line.includes(index)) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return true;
      }
    }
  }
  return false;
}
