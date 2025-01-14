import React, { useState } from 'react';
import Board from './Board';

const Game = () => {
    const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);

    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);

    const handleClick = (i) => {
        const newHistory = history.slice(0, stepNumber + 1);
        const current = newHistory[newHistory.length - 1];
        const squares = current.squares.slice();

        if (winner || squares[i]) {
            return;
        }

        squares[i] = 'X';
        const updatedHistory = newHistory.concat([{ squares }]);
        setHistory(updatedHistory);
        setStepNumber(newHistory.length);
        setXIsNext(false);

        if (!calculateWinner(squares)) {
            const aiMove = getAIMove(squares);
            if (aiMove !== undefined) {
                squares[aiMove] = 'O';
                setHistory(updatedHistory.concat([{ squares }]));
                setStepNumber(newHistory.length + 1);
                setXIsNext(true);
            }
        }
    };

    const jumpTo = (step) => {
        setStepNumber(step);
        setXIsNext(step % 2 === 0);
    };

    const renderMoves = () => {
        return history.map((_, move) => {
            const desc = move ? `Go to move #${move}` : 'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => jumpTo(move)}>{desc}</button>
                </li>
            );
        });
    };

    return (
        <div className="game">
            <div className="game-board">
                <Board squares={current.squares} onClick={handleClick} winner={winner} />
            </div>
            <div className="game-info">
                <h1 className="win">
                    <div>{winner ? 'Winner: ' + winner : 'Next player: ' + (xIsNext ? 'X' : 'O')}</div>
                </h1>
                <ol>{renderMoves()}</ol>
            </div>
        </div>
    );
};

const calculateWinner = (squares) => {
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
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
};

const getAIMove = (squares) => {
    const availableMoves = squares
        .map((square, index) => (square === null ? index : null))
        .filter((index) => index !== null);
    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    return availableMoves[randomIndex];
};

export default Game;