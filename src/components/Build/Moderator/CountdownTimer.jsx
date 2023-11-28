import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
const CountdownTimer = ({ countdownTime, startTime }) => {
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      updateCounter();
    }, 1000);

    function updateCounter() {
      const now = new Date();
      const start = new Date(startTime);
      const elapsedTime = now - start;
      let seconds = countdownTime - (elapsedTime / 1000) | 0;

      if (seconds < 0) seconds = -seconds | 0;

      const hours = (seconds / 3600) | 0;
      const minutes = (seconds % 3600 / 60) | 0;
      seconds = seconds % 60;

      setTime({
        hours: hours < 10 ? `0${hours}` : hours,
        minutes: minutes < 10 ? `0${minutes}` : minutes,
        seconds: seconds < 10 ? `0${seconds}` : seconds
      });
    }

    return () => clearInterval(interval);
  }, [countdownTime]);

  return (
    <div style={{ display: 'flex', alignItems:"center" }} id="counter">
      <CircularProgress style={{ marginRight:"5px"}} size={15}/>
      {time.hours}:{time.minutes}:{time.seconds}
    </div>
  );
};

export default CountdownTimer;
