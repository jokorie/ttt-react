import React, { useCallback } from 'react';

export const BoardFunctions = (
    xTurn,
    setXTurn, 
    squares,
    setSquares,
    setWinningSquares,
) => {

    const checkWinner = useCallback(
        (gameBoard) => {
            const lines = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
                [0, 4, 8], [2, 4, 6]  // Diagonals
            ];

            for (let i = 0; i < lines.length; i++) {
                const [a, b, c] = lines[i];
                if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                    // console.log("Winner", gameBoard[a])
                    return [gameBoard[a], lines[i]];
                }
            }
            return [null, null];
        },
    []);

    console.log(xTurn);
    const handleClick = useCallback(
        (i) => {
            console.log(xTurn);
            if (squares[i] || checkWinner(squares)[0]) return; // opp turn, square alr filled, game over

            console.log("Player", xTurn, "placed at position", i);
            const piece = (xTurn)? "X" : "O";
            setSquares[i](piece);

            setXTurn(!xTurn);
        },
    [squares, checkWinner]);

    

    const evaluate = useCallback(
        (board, isBot) => {
            // perspective of bot
            const winner = checkWinner(board)[0];
            // console.log(winner);
            if (winner) return (winner === "O")? [Infinity, null]: [-Infinity, null];
            var best = null;
            var loc = null;
            for (let i = 0; i < board.length; i++) {
                if (!board[i]) {
                    board[i] = (isBot)? "O": "X";
                    const [score, _] = evaluate(board, !isBot);
                    board[i] = null;
                    
                    if (isBot) {
                        if ((best === null) || score >= best) {
                            best = score;
                            loc = i;
                        }
                    }
                    else {
                        if ((best === null) || score <= best) {
                            best = score;
                            loc = i;
                        }
                    }
                }
            }
            return [(best === null)? 0: best, loc]
        },
    []);

    const restartGame = useCallback(
        () => {
            console.log("Game Restarted");
            setWinningSquares([]);
            setXTurn(true);
            for (let i = 0; i < setSquares.length; i++){
                setSquares[i](null);
            }
        },
        []
    )

    return [handleClick, checkWinner, evaluate, restartGame]
}