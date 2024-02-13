/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import useQuizGameStore from "@zustand/quizGameStore";
import useQuizMatchStore from "@zustand/quizMatchStore";
import { useAudio } from "..";

const useQuizMatchLoad = () => {
  const { quiz, giveNewAttempt, updateQuiz, setCurrentQuestion } =
    useQuizGameStore();
  const {
    currentQuestion,
    getRandomQuestions,
    updatedCurrentQuestion,
    currentQuestionIndex,
    incorrectAnswers,
    resetAccumulatedEarn,
  } = useQuizMatchStore();
  const { toggle: toggleLoserSound } = useAudio("/sounds/loser-sound.mp3");
  const { toggle: toggleWinnerSound } = useAudio("/sounds/winner-sound.mp3");

  useEffect(() => {
    if (quiz.isQuizStarted) {
      getRandomQuestions(quiz);
    }
  }, [quiz.isQuizStarted]);

  useEffect(() => {
    updatedCurrentQuestion(quiz, updateQuiz);
  }, [currentQuestionIndex, quiz.isNewAttempt]);

  useEffect(() => {
    setCurrentQuestion(quiz.id, currentQuestion);
  }, [currentQuestion]);

  useEffect(() => {
    if (quiz.isGameCompleted && quiz.matchResult === "Correcta") {
      toggleWinnerSound();
    } else if (
      (quiz.isGameCompleted && quiz.matchResult === "Incorrecta") ||
      (quiz.isGameCompleted && quiz.matchResult === "SinResponder")
    ) {
      toggleLoserSound();
    }
  }, [quiz.isGameCompleted, quiz.matchResult]);

  useEffect(() => {
    if (incorrectAnswers > 1) {
      giveNewAttempt(quiz.id, false);
    } else if (quiz.matchResult !== "EnEspera") {
      giveNewAttempt(quiz.id, false);
    }
  }, [incorrectAnswers, quiz.matchResult]);

  useEffect(() => {
    if (quiz.matchResult === "SinResponder") {
      resetAccumulatedEarn();
    }
  }, [quiz.matchResult]);
};

export default useQuizMatchLoad;
