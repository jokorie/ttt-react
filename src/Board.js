import React, { useState } from 'react';
import './Board.css';


export function Board ({xTurn, setXTurn, squares, setSquares, handleClick, checkWinner, evaluate, winningSquares}) {

    const renderSquare = (i) => {
        return (
            <button className={`square ${winningSquares.includes(i) ? 'highlight' : ''}`} onClick={() => handleClick(i)}> 
                {squares[i]}
            </button>
        );
    };    

    return (
    <div>
        <div className='board-row'>
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
        </div>
        <div className='board-row'>
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
        </div>
        <div className='board-row'>
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
        </div>
    </div>)
};