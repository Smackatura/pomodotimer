import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerType, setTimerType] = useState('Session');
  const [timerID, setTimerID] = useState(null);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const toggleTimer = () => {
    if (!timerRunning) {
      setTimerRunning(true);
      setTimerID(
        setInterval(() => {
          setTimeLeft((prevTime) => {
            const newTime = prevTime - 1;
            if (newTime < 0) {
              clearInterval(timerID);
              setTimerRunning(false);
              setTimerType(timerType === 'Session' ? 'Break' : 'Session');
              return timerType === 'Session' ? breakLength * 60 : sessionLength * 60;
            }
            return newTime;
          });
        }, 1000)
      );
    } else {
      setTimerRunning(false);
      clearInterval(timerID);
    }
  };

  const resetTimer = () => {
    setSessionLength(25);
    setBreakLength(5);
    setTimeLeft(25 * 60);
    setTimerRunning(false);
    setTimerType('Session');
    clearInterval(timerID);
  };

  useEffect(() => {
    setTimeLeft(sessionLength * 60);
  }, [sessionLength]);

  return (
    <div classNAme="container">
      <div className="container-fluid">
      <h1>Pomodoro Timer</h1>
      <div id="settings">
        <div>
          <h2>Session Length</h2>
          <button onClick={() => setSessionLength((prevSession) => prevSession - 1)}>-</button>
          <span>{sessionLength}</span>
          <button onClick={() => setSessionLength((prevSession) => prevSession + 1)}>+</button>
        </div>
        <div>
          <h2>Break Length</h2>
          <button onClick={() => setBreakLength((prevBreak) => prevBreak - 1)}>-</button>
          <span>{breakLength}</span>
          <button onClick={() => setBreakLength((prevBreak) => prevBreak + 1)}>+</button>
        </div>
      </div>
      <div id="timer">
        <h2>{timerType}</h2>
        <h1>{formatTime(timeLeft)}</h1>
        <button onClick={toggleTimer}>{timerRunning ? 'Pause' : 'Start'}</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
      </div>
      
    </div>
  );
};

export default Timer;
