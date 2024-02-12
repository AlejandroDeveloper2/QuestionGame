import { GrLinkNext } from "react-icons/gr";
import { IoExit } from "react-icons/io5";

import { AnswerReviewProps } from "@models/ComponentPropsModels";

import useQuizGameStore from "@zustand/quizGameStore";
import useQuizMatchStore from "@zustand/quizMatchStore";

import { ButtonWithIcon, Spinner } from "@components/index";

import {
  AnswerResultTitle,
  Controls,
  MessageContainer,
} from "./AnswerReviewWindow.style";

import { CheckSvg, XSvg } from "@assets/index";

const AnswerReviewWindow = ({ closeModal }: AnswerReviewProps): JSX.Element => {
  const { quiz, isLoading, leaveGame, updateQuiz } = useQuizGameStore();
  const {
    currentQuestionIndex,
    currentQuestion,
    nextQuestion,
    exitMatch,
    randomQuestions,
    incorrectAnswers,
  } = useQuizMatchStore();

  return isLoading ? (
    <Spinner
      message="Cargando resultado de la ronda..."
      color="var(--primary-color-base)"
    />
  ) : (
    <>
      {quiz.matchResult === "Correcta" ? (
        <AnswerResultTitle>¡Respuesta Correcta!</AnswerResultTitle>
      ) : quiz.matchResult === "Incorrecta" ? (
        <AnswerResultTitle style={{ color: "var(--red)" }}>
          ¡Respuesta Incorrecta!
        </AnswerResultTitle>
      ) : quiz.matchResult === "SinResponder" ? (
        <AnswerResultTitle style={{ color: "var(--red)" }}>
          ¡El tiempo se termino!
        </AnswerResultTitle>
      ) : null}
      {quiz.matchResult === "Correcta" && incorrectAnswers === 0 ? (
        <MessageContainer>
          <CheckSvg />
          <span>+ ${currentQuestion?.reward}</span>
        </MessageContainer>
      ) : incorrectAnswers > 0 ? (
        <MessageContainer>
          <CheckSvg />
          <span>¡Continua con el juego!</span>
        </MessageContainer>
      ) : quiz.matchResult === "Incorrecta" ||
        quiz.matchResult === "SinResponder" ? (
        <MessageContainer>
          <XSvg />
          <p>¡Perdiste el acumulado!</p>
        </MessageContainer>
      ) : null}
      <Controls>
        {quiz.matchResult === "Correcta" &&
        currentQuestionIndex < randomQuestions.length - 1 ? (
          <ButtonWithIcon
            Icon={GrLinkNext}
            label="Continuar"
            style={{
              background: "var(--primary-color-base)",
              color: "var(--white)",
              width: {
                sm: 140,
                md: 190,
                lg: 240,
              },
              height: {
                sm: 75,
                md: 84,
                lg: 84,
              },
            }}
            title="Continuar con la siguiente pregunta"
            onClick={() => {
              nextQuestion(quiz, updateQuiz);
              //closeModal();
            }}
          />
        ) : null}
        <ButtonWithIcon
          Icon={IoExit}
          label="Parar"
          style={{
            background: "var(--red)",
            color: "var(--white)",
            width: {
              sm: 140,
              md: 190,
              lg: 240,
            },
            height: {
              sm: 75,
              md: 84,
              lg: 84,
            },
          }}
          title={
            quiz.matchResult === "Correcta"
              ? "Retirarse del juego!"
              : "Terminar juego!"
          }
          onClick={() => {
            exitMatch(quiz, leaveGame);
            closeModal();
          }}
        />
      </Controls>
    </>
  );
};

export default AnswerReviewWindow;
