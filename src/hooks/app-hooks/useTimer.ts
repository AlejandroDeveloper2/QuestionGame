/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

import useQuizGameStore from "@zustand/quizGameStore";
import useQuizMatchStore from "@zustand/quizMatchStore";

const useTimer = () => {
  const { quiz, stopMatch, updateQuiz } = useQuizGameStore();
  const { updateTimeTaken, currentQuestion } = useQuizMatchStore();
  const [timerInterval, setTimerInterval] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  const beginTimer = (): void => {
    setTimerInterval(
      window.setInterval(() => {
        updateTimeTaken();
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
    setSeconds(currentQuestion?.time);
  }, [currentQuestion]);

  useEffect(() => {
    if (quiz.isMatchStarted) {
      beginTimer();
    } else {
      setSeconds(currentQuestion?.time);
      window.clearInterval(timerInterval);
    }
  }, [quiz.isMatchStarted]);

  useEffect(() => {
    if (seconds === 0 && quiz.isMatchStarted) {
      stopMatch(quiz.id);
      updateQuiz(quiz.id, "SinResponder");
      window.clearInterval(timerInterval);
    } else if (quiz.isGameCompleted) {
      window.clearInterval(timerInterval);
    }
  }, [seconds, quiz.isGameCompleted, quiz.isMatchStarted]);

  return {
    seconds: `0:${seconds < 10 ? "0" + seconds : seconds}`,
  };
};

export default useTimer;
