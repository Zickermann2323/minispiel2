// src/BallGame.js
import React, { useState, useEffect } from 'react';
import './BallGame.css';

const BallGame = () => {
  const [ballX, setBallX] = useState(50);
  const [ballY, setBallY] = useState(50);
  const [targetX, setTargetX] = useState(Math.random() * 90);
  const [targetY, setTargetY] = useState(Math.random() * 90);
  const [velocityX, setVelocityX] = useState(1.5);
  const [velocityY, setVelocityY] = useState(1.2);
  const [canGuess, setCanGuess] = useState(false);
  const [showTarget, setShowTarget] = useState(false);
  const [resultMessage, setResultMessage] = useState('');

  useEffect(() => {
    const moveInterval = setInterval(() => {
      setBallX(prev => (prev + velocityX) % 100);
      setBallY(prev => (prev + velocityY) % 100);
    }, 1000 / 60); // 60 FPS

    const stopTimer = setTimeout(() => {
      clearInterval(moveInterval);
      setCanGuess(true);
    }, 15000);

    return () => {
      clearInterval(moveInterval);
      clearTimeout(stopTimer);
    };
  }, []);

  const handleShowTarget = () => {
    setShowTarget(true);
    const dx = ballX - targetX;
    const dy = ballY - targetY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    setResultMessage(`Abstand zum Ziel: ${distance.toFixed(2)}%`);
  };

  return (
    <div className="game-container">
      <div className="play-area">
        <div className="ball" style={{ left: `${ballX}%`, top: `${ballY}%` }} />
        {showTarget && (
          <div className="target" style={{ left: `${targetX}%`, top: `${targetY}%` }} />
        )}
      </div>
      {canGuess && !showTarget && (
        <button onClick={handleShowTarget}>Ziel anzeigen</button>
      )}
      {resultMessage && <p>{resultMessage}</p>}
    </div>
  );
};

export default BallGame;
