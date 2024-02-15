/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

import useQuizGameStore from "@zustand/quizGameStore";
import useQuizMatchStore from "@zustand/quizMatchStore";
import { useAudio } from "..";

const useTimer = () => {
  const { quiz, updateQuiz, stopMatch } = useQuizGameStore();
  const { updateTimeTaken, currentQuestion, updateTimerValue } =
    useQuizMatchStore();
  const [timerInterval, setTimerInterval] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  const { toggle: toggleCountdownSound } = useAudio(
    "/sounds/count-down-sound.mp3"
  );

  const button = window.document.createElement("button");
  button.addEventListener("click", () => toggleCountdownSound());

  useEffect(() => {
    if (quiz.isMatchStarted && seconds === 5) {
      button.click();
    }
    return () => {
      button.removeEventListener("click", () => toggleCountdownSound());
      button.remove();
    };
  }, [seconds, quiz.isMatchStarted]);

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
    updateTimerValue(seconds);
  }, [seconds]);

  useEffect(() => {
    setSeconds(currentQuestion?.time);
  }, [currentQuestion]);

  useEffect(() => {
    if (quiz.isMatchStarted) {
      beginTimer();
    } else {
      window.clearInterval(timerInterval);
      setSeconds(currentQuestion?.time);
    }
  }, [quiz.isMatchStarted, currentQuestion?.time]);

  useEffect(() => {
    if (seconds === 0 && quiz.isMatchStarted) {
      stopMatch(quiz.id);
      updateQuiz(quiz.id, "SinResponder");
      window.clearInterval(timerInterval);
    }
  }, [seconds, quiz.isMatchStarted]);

  return {
    seconds: `0:${seconds < 10 ? "0" + seconds : seconds}`,
  };
};

export default useTimer;
