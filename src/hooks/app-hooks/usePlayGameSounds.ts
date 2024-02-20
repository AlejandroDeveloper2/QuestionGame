/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import { useAudio } from "..";
import useQuizGameStore from "@zustand/quizGameStore";

const usePlayGameSounds = (): void => {
  const { quiz } = useQuizGameStore();

  const { toggle: toggleLoserSound } = useAudio("/sounds/loser-sound.mp3");
  const { toggle: toggleWinnerSound } = useAudio("/sounds/winner-sound.mp3");
  const { toggle: toggleWrongAnswerSound } = useAudio(
    "/sounds/wrong-answer-sound.mp3"
  );
  const { toggle: toggleCorrectAnswerSound } = useAudio(
    "/sounds/correct-answer-sound.mp3"
  );

  const $buttonCorrect = window.document.createElement("button");
  const $buttonInCorrect = window.document.createElement("button");
  $buttonCorrect.addEventListener("click", () => toggleCorrectAnswerSound());
  $buttonInCorrect.addEventListener("click", () => toggleWrongAnswerSound());

  useEffect(() => {
    if (quiz.matchResult === "Correcta") {
      $buttonCorrect.click();
    } else if (quiz.matchResult === "Incorrecta") {
      $buttonInCorrect.click();
    }
    return () => {
      $buttonCorrect.removeEventListener("click", () =>
        toggleCorrectAnswerSound()
      );
      $buttonInCorrect.removeEventListener("click", () =>
        toggleWrongAnswerSound()
      );
      $buttonCorrect.remove();
      $buttonInCorrect.remove();
    };
  }, [quiz.matchResult]);

  useEffect(() => {
    if (quiz.isGameCompleted && quiz.matchResult === "Correcta") {
      toggleWinnerSound();
    } else if (
      (quiz.isGameCompleted && quiz.matchResult === "Incorrecta") ||
      (quiz.isGameCompleted && quiz.matchResult === "SinResponderRetirado")
    ) {
      toggleLoserSound();
    }
  }, [quiz.isGameCompleted, quiz.matchResult]);
};

export default usePlayGameSounds;
