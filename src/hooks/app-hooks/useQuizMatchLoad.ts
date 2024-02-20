/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import useQuizGameStore from "@zustand/quizGameStore";
import useQuizMatchStore from "@zustand/quizMatchStore";

const useQuizMatchLoad = () => {
  const { quiz, giveNewAttempt, updateQuiz } = useQuizGameStore();
  const {
    match,
    getRandomQuestions,
    updatedCurrentQuestion,
    updateIncorrectAnswer,
  } = useQuizMatchStore();

  useEffect(() => {
    if (quiz.isQuizStarted) {
      getRandomQuestions(quiz);
    }
  }, [quiz.isQuizStarted]);

  useEffect(() => {
    updatedCurrentQuestion(quiz, updateQuiz);
  }, [match.currentQuestionIndex, quiz.isNewAttempt]);

  useEffect(() => {
    if (match.incorrectAnswers > 1) {
      giveNewAttempt(quiz.id, false);
    } else if (quiz.matchResult !== "EnEspera") {
      giveNewAttempt(quiz.id, false);
    }
  }, [match.incorrectAnswers, quiz.matchResult]);

  /*Validar si se le acaba el tiempo y se le da una oportunidad con una pregunta dificil */
  useEffect(() => {
    if (quiz.matchResult === "SinResponder") {
      updateIncorrectAnswer();
    }
  }, [quiz.matchResult]);
};

export default useQuizMatchLoad;
