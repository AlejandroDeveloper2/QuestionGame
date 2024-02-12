import { useState, useEffect } from "react";

const useCallTimer = () => {
  const [timerInterval, setTimerInterval] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(20);

  const startCallTimer = (): void => {
    setTimerInterval(
      window.setInterval(() => {
        setSeconds((prevState) => {
          if (prevState > 0) {
            return prevState - 1;
          }
          return prevState;
        });
      }, 1000)
    );
  };

  useEffect(() => {
    if (seconds === 0) {
      window.clearInterval(timerInterval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);

  return {
    startCallTimer,
    callSeconds: `0:${seconds < 10 ? "0" + seconds : seconds}`,
  };
};

export default useCallTimer;
