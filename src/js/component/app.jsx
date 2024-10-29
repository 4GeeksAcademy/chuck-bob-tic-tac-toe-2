import React, { useState } from "react";
import "./Styles.css";

const Header = () => (
    <header>
        <h1>Tic Tac Toe Game</h1>
    </header>
);

const SelectionScreen = ({ onStartGame }) => (
    <div className="selection-screen">
        <h2>Select Your Game Mode</h2>
        
        {/* Injected HTML structure for weapon selection */}
        <div className="selection-window">
            <div className="text-pick-a-weapon">Pick a weapon</div>
            
            <div className="smaller-selection-window">
                <div className="text-choose-your-weapon">Choose your weapon</div>
                
                <div className="input-area">
                    <div className="input-1"><input placeholder="Player 1 Name"></input></div> 
                    <div className="input-2"><input placeholder="Player 2 Name"></input></div> 
                </div>
                
                <div className="button-area">
                    <div className="button-1"><button>O</button></div> 
                    <div className="button-2"><button>X</button></div> 
                </div>
            </div>
        </div>

        {/* Start Game Button */}
        <button onClick={onStartGame}>Start Game</button>
    </div>
);

const GameBoard = ({ squareValues, currPlayer, winner, onMove, onReset }) => (
    <div className="game-board">
        <h1>{winner ? `Winner: ${winner}` : `Current Player: ${currPlayer}`}</h1>
        
        <div className="row top">
            <div onClick={() => onMove(0)} className="col-4 top-left">{squareValues[0]}</div>
            <div onClick={() => onMove(1)} className="col-4 top-center">{squareValues[1]}</div>
            <div onClick={() => onMove(2)} className="col-4 top-right">{squareValues[2]}</div>
        </div>
        <div className="row middle">
            <div onClick={() => onMove(3)} className="col-4 middle-left">{squareValues[3]}</div>
            <div onClick={() => onMove(4)} className="col-4 middle-center">{squareValues[4]}</div>
            <div onClick={() => onMove(5)} className="col-4 middle-right">{squareValues[5]}</div>
        </div>
        <div className="row bottom">
            <div onClick={() => onMove(6)} className="col-4 bottom-left">{squareValues[6]}</div>
            <div onClick={() => onMove(7)} className="col-4 bottom-center">{squareValues[7]}</div>
            <div onClick={() => onMove(8)} className="col-4 bottom-right">{squareValues[8]}</div>
        </div>
        
        {/* Reset Game Button */}
        <button onClick={onReset} className="reset-button">Reset Game</button>
    </div>
);

const App = () => {
    const [squareValues, setSquareValues] = useState(["", "", "", "", "", "", "", "", ""]);
    const [currPlayer, setCurrPlayer] = useState("X");
    const [winner, setWinner] = useState(null);
    const [showGame, setShowGame] = useState(false);

    const checkWinner = (values) => {
        const winningCombos = [
            [1, 1, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 1, 1],
            [1, 0, 0, 1, 0, 0, 1, 0, 0],
            [0, 1, 0, 0, 1, 0, 0, 1, 0],
            [0, 0, 1, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 1],
            [0, 0, 1, 0, 1, 0, 1, 0, 0]
        ];
        let counter = 0;
        for (let combo of winningCombos) {
            counter = 0;
            for (let i = 0; i < combo.length; i++) {
                if (combo[i] === 1) {
                    if (values[i] === currPlayer) {
                        counter++;
                    } else {
                        counter = 0;
                    }
                }
                if (counter === 3) {
                    setWinner(currPlayer);
                    return;
                }
            }
        }
    };

    const currentMove = (index) => {
        if (squareValues[index] !== "" || winner) return;
        let newValues = [...squareValues];
        newValues[index] = currPlayer;
        setSquareValues(newValues);
        checkWinner(newValues);
        setCurrPlayer(currPlayer === "X" ? "O" : "X");
    };

    const startGame = () => {
        setSquareValues(["", "", "", "", "", "", "", "", ""]);
        setCurrPlayer("X");
        setWinner(null);
        setShowGame(true);
    };

    // Reset Game function to clear the board and reset the player to "X"
    const resetGame = () => {
        setSquareValues(["", "", "", "", "", "", "", "", ""]);
        setCurrPlayer("X");
        setWinner(null);
    };

    return (
        <div className="App">
            <Header />
            {showGame ? (
                <GameBoard
                    squareValues={squareValues}
                    currPlayer={currPlayer}
                    winner={winner}
                    onMove={currentMove}
                    onReset={resetGame}  // Passing the reset function to GameBoard
                />
            ) : (
                <SelectionScreen onStartGame={startGame} />
            )}
        </div>
    );
};

export default App;
