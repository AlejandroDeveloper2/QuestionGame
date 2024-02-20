/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

import useQuizGameStore from "@zustand/quizGameStore";
import useQuizMatchStore from "@zustand/quizMatchStore";
import { useAudio } from "..";

const useTimer = () => {
  const { quiz, updateQuiz, stopMatch } = useQuizGameStore();
  const { match, updateTimeTaken, updateTimerValue } = useQuizMatchStore();
  const [timerInterval, setTimerInterval] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  const { toggle: toggleCountdownSound } = useAudio(
    "/sounds/count-down-sound.mp3"
  );
  const {
    playing,
    toggle: toggleClockSound,
    replayAudio,
    stopAudio,
  } = useAudio("/sounds/tictac-sound.mp3");

  const $buttonTimeout = window.document.createElement("button");
  $buttonTimeout.addEventListener("click", () => toggleCountdownSound());
  const $buttonClocksound = window.document.createElement("button");
  $buttonClocksound.addEventListener("click", () => toggleClockSound());

  useEffect(() => {
    if (seconds === 5) {
      stopAudio();
    }
  }, [seconds]);

  useEffect(() => {
    if (quiz.isMatchStarted) {
      replayAudio();
      $buttonClocksound.click();
    } else {
      if (playing) {
        replayAudio();
        $buttonClocksound.click();
      }
    }
    return () => {
      $buttonClocksound.removeEventListener("click", () => toggleClockSound());
      $buttonClocksound.remove();
    };
  }, [quiz.isMatchStarted]);

  useEffect(() => {
    if (quiz.isMatchStarted && seconds === 5) {
      $buttonTimeout.click();
    }
    return () => {
      $buttonTimeout.removeEventListener("click", () => toggleCountdownSound());
      $buttonTimeout.remove();
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

  const stopTimer = (): void => {
    window.clearInterval(timerInterval);
  };

  useEffect(() => {
    updateTimerValue(seconds);
  }, [seconds]);

  useEffect(() => {
    setSeconds(match.currentQuestion?.time);
  }, [match.currentQuestion?.time]);

  useEffect(() => {
    if (quiz.isMatchStarted) {
      beginTimer();
    } else {
      stopTimer();
      if (quiz.matchResult !== "EnEspera")
        setSeconds(match.currentQuestion?.time);
    }
    return () => stopTimer();
  }, [quiz.isMatchStarted, match.currentQuestion?.time, quiz.matchResult]);

  useEffect(() => {
    const stopQuizTimeout = async () => {
      if (seconds === 0 && quiz.isMatchStarted) {
        await stopMatch(quiz.id);
        await updateQuiz(quiz.id, "SinResponder");
        stopTimer();
      }
    };
    stopQuizTimeout();
  }, [seconds, quiz.isMatchStarted]);

  return {
    seconds: `0:${seconds < 10 ? "0" + seconds : seconds}`,
  };
};

export default useTimer;
