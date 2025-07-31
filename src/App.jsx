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

  const show
