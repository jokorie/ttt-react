import logo from './logo.svg';
import './App.css';
import react, {useState, useEffect} from 'react';
import {Board} from './Board';
import { BoardFunctions } from './BoardFunctions';

function App() {
    const [xTurn, setXTurn] = useState(true);

    const [square0, setSquare0] = useState(null);
    const [square1, setSquare1] = useState(null);
    const [square2, setSquare2] = useState(null);
    const [square3, setSquare3] = useState(null);
    const [square4, setSquare4] = useState(null);
    const [square5, setSquare5] = useState(null);
    const [square6, setSquare6] = useState(null);
    const [square7, setSquare7] = useState(null);
    const [square8, setSquare8] = useState(null);

    const squares = [
        square0,
        square1,
        square2,
        square3,
        square4,
        square5,
        square6,
        square7,
        square8,
    ];
 
    const setSquares = [
        setSquare0,
        setSquare1,
        setSquare2,
        setSquare3,
        setSquare4,
        setSquare5,
        setSquare6,
        setSquare7,
        setSquare8,
    ];

    const [winningSquares, setWinningSquares] = useState([]);

    const [handleClick, checkWinner, evaluate, restartGame] = (
        BoardFunctions(
            xTurn,
            setXTurn,
            squares,
            setSquares,
            setWinningSquares,
        ));
    
    useEffect(() => {
        const potWinning = checkWinner(squares)[1];
        if (potWinning) {
            setWinningSquares(potWinning);
        }
    
        if (!xTurn) {
            const [_, move] = evaluate(squares, true);
            if (move !== null) {
                handleClick(move);
            }
        }
    }, [xTurn]);


    return (
        <div className="App">
            <h1>Tic Tac Toe</h1>
            <div className="container">
                <Board
                xTurn={xTurn}
                setXTurn={setXTurn} 
                squares={squares} 
                setSquares={setSquares} 
                handleClick={handleClick} 
                checkWinner={checkWinner} 
                evaluate={evaluate}
                winningSquares={winningSquares}
                />
            </div>
            <button
              className="myButton"
              onClick={restartGame}
            >
                Restart
            </button>
        </div>
    );
}

export default App;
