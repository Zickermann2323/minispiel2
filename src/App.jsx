import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const BALL_COUNT = 4;
const BALL_SIZE = 50;
const AREA_SIZE = 400;

function App() {
  const [positions, setPositions] = useState(generateRandomPositions());
  const [targetIndex, setTargetIndex] = useState(null);
  const [canGuess, setCanGuess] = useState(false);
  const [showTarget, setShowTarget] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const timerRef = useRef(null);

  function generateRandomPositions() {
    return Array.from({ length: BALL_COUNT }, () => ({
      x: Math.random() * (AREA_SIZE - BALL_SIZE),
      y: Math.random() * (AREA_SIZE - BALL_SIZE),
    }));
  }

  const startGame = () => {
    setResultMessage('');
    setShowTarget(false);
    setCanGuess(false);
    setPositions(generateRandomPositions());

    timerRef.current = setInterval(() => {
      setPositions(generateRandomPositions());
    }, 1000 / 60); // 60 FPS

    setTimeout(() => {
      clearInterval(timerRef.current);
      setCanGuess(true);
    }, 15000);
  };

  const showTargetBall = () => {
    if (!canGuess) {
      setTargetIndex(Math.floor(Math.random() * BALL_COUNT));
      setShowTarget(true);
    }
  };

  const handleClick = (index) => {
    if (!canGuess) return;
    if (index === targetIndex) {
      setResultMessage('🎉 Richtig!');
    } else {
      setResultMessage('❌ Falsch!');
    }
    setCanGuess(false);
  };

  return (
    <div className="App">
      <h1>Ball Game</h1>
      <div className="button-container">
        <button onClick={showTargetBall}>Show Target</button>
        <button onClick={startGame}>Start</button>
      </div>
      <div className="game-area">
        {positions.map((pos, i) => (
          <div
            key={i}
            className="ball"
            style={{
              left: pos.x,
              top: pos.y,
              backgroundColor: showTarget && i === targetIndex ? 'red' : 'blue',
            }}
            onClick={() => handleClick(i)}
          />
        ))}
      </div>
      {resultMessage && <div className="result">{resultMessage}</div>}
    </div>
  );
}

export default App;

