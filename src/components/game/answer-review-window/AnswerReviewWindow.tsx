import { GrLinkNext } from "react-icons/gr";
import { IoExit } from "react-icons/io5";
import { TbMoneybag } from "react-icons/tb";

import { AnswerReviewProps } from "@models/ComponentPropsModels";

import useQuizGameStore from "@zustand/quizGameStore";
import useQuizMatchStore from "@zustand/quizMatchStore";

import { BadgeWithLabel, ButtonWithIcon } from "@components/index";

import {
  AnswerResultTitle,
  Controls,
  MessageContainer,
} from "./AnswerReviewWindow.style";

import { CheckSvg } from "@assets/index";

const AnswerReviewWindow = ({ closeModal }: AnswerReviewProps): JSX.Element => {
  const { quiz, leaveGame, updateQuiz } = useQuizGameStore();
  const { match, nextQuestion, exitMatch } = useQuizMatchStore();

  return (
    <>
      {quiz.matchResult === "Correcta" ? (
        <AnswerResultTitle>¡Respuesta Correcta!</AnswerResultTitle>
      ) : quiz.matchResult === "Incorrecta" ? (
        <AnswerResultTitle style={{ color: "var(--red)" }}>
          ¡Respuesta Incorrecta!
        </AnswerResultTitle>
      ) : (
        <AnswerResultTitle style={{ color: "var(--orange)" }}>
          ¡Se te acabo el tiempo!
        </AnswerResultTitle>
      )}
      {quiz.matchResult === "Correcta" && match.incorrectAnswers === 0 ? (
        <MessageContainer>
          <CheckSvg />
          <span id="match-result-span">+ ${match.currentQuestion?.reward}</span>
        </MessageContainer>
      ) : match.incorrectAnswers > 0 &&
        quiz.matchResult === "Correcta" &&
        !match.isDividedWildCard ? (
        <MessageContainer>
          <CheckSvg />
          <span id="match-result-span">¡Continua con el juego!</span>
        </MessageContainer>
      ) : quiz.matchResult === "Incorrecta" ||
        quiz.matchResult === "SinResponderRetirado" ? (
        <MessageContainer>
          <CheckSvg />
          <p id="match-result-p">¡Ganancia Acumulada!</p>
          <BadgeWithLabel
            label="Premio seguro"
            Icon={TbMoneybag}
            style={{ backgroundcolor: "var(--gray)", color: "var(--white)" }}
            value={
              quiz.consolationAward === "" ? "$0" : "$" + quiz.consolationAward
            }
          />
        </MessageContainer>
      ) : null}
      <Controls>
        {quiz.matchResult === "Correcta" &&
        match.currentQuestionIndex < match.randomQuestions?.length - 1 ? (
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
