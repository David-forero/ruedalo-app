import { useEffect, useState } from 'react';

const useCountdownTimer = (initialTimeInSeconds) => {
  const [timer, setTimer] = useState(initialTimeInSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const resetTimer = () => {
    setTimer(initialTimeInSeconds);
  };

  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return {
    timer,
    resetTimer,
    formatTime,
  };
};

export default useCountdownTimer;
