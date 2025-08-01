import React, { useEffect, useRef, useState } from 'react';
import './BallGame.css';

const BallGame = () => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [canGuess, setCanGuess] = useState(false);
  const [target, setTarget] = useState({ x: 0, y: 0 });
  const [message, setMessage] = useState('');
  const animationRef = useRef();

  const moveBall = () => {
    setPosition(prev => {
      let newX = prev.x + (Math.random() - 0.5) * 10;
      let newY = prev.y + (Math.random() - 0.5) * 10;
      newX = Math.max(0, Math.min(100, newX));
      newY = Math.max(0, Math.min(100, newY));
      return { x: newX, y: newY };
    });
    animationRef.current = requestAnimationFrame(moveBall);
  };

  const startGame = () => {
    setMessage('');
    setCanGuess(false);
    setTarget({ x: position.x, y: position.y });
    animationRef.current = requestAnimationFrame(moveBall);

    setTimeout(() => {
      cancelAnimationFrame(animationRef.current);
      setCanGuess(true);
    }, 15000); // 15 Sekunden
  };

  const handleGuess = () => {
    const dx = position.x - target.x;
    const dy = position.y - target.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 10) {
      setMessage('🎉 Treffer! Gut geraten!');
    } else {
      setMessage(`Leider daneben. Abstand: ${distance.toFixed(2)}`);
    }
    setCanGuess(false);
  };

  return (
    <div className="game-container">
      <h1>Ball Game</h1>
      <div className="ball" style={{ left: `${position.x}%`, top: `${position.y}%` }} />
      <button onClick={startGame}>Start</button>
      <button onClick={handleGuess} disabled={!canGuess}>Raten</button>
      <p>{message}</p>
    </div>
  );
};

export default BallGame;
