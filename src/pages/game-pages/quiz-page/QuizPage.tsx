/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useQuizGameStore from "@zustand/quizGameStore";
import useQuizMatchStore from "@zustand/quizMatchStore";
import { useModal } from "@hooks/index";

import {
  Spinner,
  LoadingWindow,
  Question,
  WildCardsMenu,
  Modal,
  GameOverWindow,
  WaitingMatchWindow,
  AnswerReviewWindow,
} from "@components/index";

const QuizPage = (): JSX.Element => {
  const navigate = useNavigate();
  const { resetGame, isDividedWildCard } = useQuizMatchStore();
  const { quiz, resetQuiz } = useQuizGameStore();
  const { closeModal } = useModal();

  useEffect(() => {
    if (!quiz.isQuizStarted && quiz.isQuizFinished) {
      window.setTimeout(() => {
        resetQuiz(quiz.id, navigate, resetGame);
      }, 3000);
    }
  }, [quiz.isQuizFinished, quiz.isQuizStarted]);

  return (
    <>
      {quiz.isQuizFinished ? null : !isDividedWildCard ? (
        <Modal
          isModalVisible={
            quiz.isGameCompleted ||
            quiz.matchResult === "Correcta" ||
            quiz.matchResult === "Incorrecta" ||
            (!quiz.isMatchStarted && quiz.matchResult !== "SinResponder") ||
            (!quiz.isGameCompleted &&
              quiz.matchResult === "SinResponderRetirado")
          }
          closeModal={closeModal}
        >
          {quiz.matchResult !== "EnEspera" && !quiz.isGameCompleted ? (
            <AnswerReviewWindow closeModal={closeModal} />
          ) : quiz.matchResult !== "EnEspera" && quiz.isGameCompleted ? (
            <GameOverWindow />
          ) : !quiz.isMatchStarted ? (
            <WaitingMatchWindow />
          ) : null}
        </Modal>
      ) : null}
      <LoadingWindow
        opacity={quiz.isQuizStarted ? 0 : 1}
        isLoading={quiz.isQuizStarted ? false : true}
      >
        {quiz.isQuizFinished && !quiz.isQuizStarted ? (
          <Spinner message="¡El quiz ha terminado! Redirigiendo..." />
        ) : (
          <Spinner message="¡Esperando que el administrador inicie el quiz !" />
        )}
      </LoadingWindow>
      <Question />
      <WildCardsMenu />
    </>
  );
};

export default QuizPage;
