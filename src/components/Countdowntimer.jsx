import React, { useEffect, useState } from 'react';
import './CountdownTimer.css';

function CountdownTimer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(10);
  const [totalSeconds, setTotalSeconds] = useState(10);
  const [isRunning, setIsRunning] = useState(false);

  // Update totalSeconds when input changes
  useEffect(() => {
    setTotalSeconds(hours * 3600 + minutes * 60 + seconds);
  }, [hours, minutes, seconds]);

  // Countdown effect
  useEffect(() => {
    if (!isRunning || totalSeconds <= 0) return;

    const timer = setTimeout(() => {
      setTotalSeconds(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [totalSeconds, isRunning]);

  // Convert totalSeconds into HH:MM:SS
  const formatTime = () => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (totalSeconds > 0) setIsRunning(true);
  };

  const handleStop = () => setIsRunning(false);

  const handleReset = () => {
    setIsRunning(false);
    setTotalSeconds(hours * 3600 + minutes * 60 + seconds);
  };

  return (
    <div className="full-screen-wrapper">
      <div className="timer-container">
        <h1 className="timer-title">Countdown Timer</h1>

        <div className="input-group">
          <div className="time-input">
            <label>Hours</label>
            <input
              type="number"
              min="0"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
            />
          </div>
          <div className="time-input">
            <label>Minutes</label>
            <input
              type="number"
              min="0"
              max="59"
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
            />
          </div>
          <div className="time-input">
            <label>Seconds</label>
            <input
              type="number"
              min="0"
              max="59"
              value={seconds}
              onChange={(e) => setSeconds(Number(e.target.value))}
            />
          </div>
        </div>

        <h2 className="timer-display">{formatTime()}</h2>

        <div className="timer-buttons">
          <button onClick={handleStart} disabled={isRunning || totalSeconds === 0}>Start</button>
          <button onClick={handleStop} disabled={!isRunning}>Stop</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
      <h3 className='footer'>Made by Prataya 👾</h3>
    </div>
  );
}

export default CountdownTimer;
