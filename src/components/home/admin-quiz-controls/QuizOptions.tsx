import { MdOutlineRestartAlt, MdTimer } from "react-icons/md";
import { GrNew } from "react-icons/gr";
import { IoExit } from "react-icons/io5";

import { ButtonIconOnly } from "@components/index";

import useQuizGameStore from "@zustand/quizGameStore";
import useQuizMatchStore from "@zustand/quizMatchStore";

import { QuestionOptions } from "./AdminQuizControls.style";

const QuizOptions = (): JSX.Element => {
  const { quiz, startMatch, giveNewAttempt, stopMatch, updateQuiz } =
    useQuizGameStore();
  const { incorrectAnswers, updateMatchStatus } = useQuizMatchStore();

  return (
    <QuestionOptions>
      <ButtonIconOnly
        disabled={
          quiz.isGameCompleted ||
          quiz.isMatchStarted ||
          quiz.matchResult === "SinResponder"
        }
        type="button"
        Icon={MdTimer}
        style={{
          background: "var(--white)",
          color: "var(--gray)",
          width: {
            sm: 60,
            md: 60,
            lg: 80,
          },
          height: {
            sm: 60,
            md: 60,
            lg: 80,
          },
        }}
        title="Iniciar temporizador"
        onClick={() => {
          startMatch(quiz.id);
        }}
      />
      {/* <ButtonIconOnly
      disabled={
        quiz.isGameCompleted ||
        quiz.isMatchStarted ||
        quiz.matchResult === "SinResponder"
      }
      type="button"
      Icon={MdTimer}
      style={{
        background: "var(--gray)",
        color: "var(--white)",
        width: {
          sm: 60,
          md: 60,
          lg: 80,
        },
        height: {
          sm: 60,
          md: 60,
          lg: 80,
        },
      }}
      title="Pausar temporizador"
      onClick={() => {
        stopMatch(quiz.id);
      }}
    /> */}
      <ButtonIconOnly
        disabled={
          quiz.isGameCompleted ||
          quiz.isNewAttempt ||
          incorrectAnswers > 1 ||
          quiz.matchResult === "Correcta" ||
          quiz.matchResult === "EnEspera"
        }
        type="button"
        Icon={GrNew}
        style={{
          background: "var(--primary-color-base)",
          color: "var(--white)",
          width: {
            sm: 60,
            md: 60,
            lg: 80,
          },
          height: {
            sm: 60,
            md: 60,
            lg: 80,
          },
        }}
        title="Conceder otra oportunidad"
        onClick={() => {
          giveNewAttempt(quiz.id, true);
        }}
      />
      <ButtonIconOnly
        disabled={quiz.isGameCompleted || quiz.matchResult !== "SinResponder"}
        type="button"
        Icon={MdOutlineRestartAlt}
        style={{
          background: "var(--orange)",
          color: "var(--white)",
          width: {
            sm: 60,
            md: 60,
            lg: 80,
          },
          height: {
            sm: 60,
            md: 60,
            lg: 80,
          },
        }}
        title="Reiniciar pregunta"
        onClick={() => {
          updateMatchStatus(quiz.id, stopMatch, updateQuiz);
        }}
      />
      <ButtonIconOnly
        disabled={quiz.matchResult !== "SinResponder"}
        type="button"
        Icon={IoExit}
        title="Retirarse del juego"
        style={{
          background: "var(--red)",
          color: "var(--white)",
          width: {
            sm: 60,
            md: 60,
            lg: 80,
          },
          height: {
            sm: 60,
            md: 60,
            lg: 80,
          },
        }}
        onClick={() => updateQuiz(quiz.id, "SinResponderRetirado")}
      />
    </QuestionOptions>
  );
};

export default QuizOptions;
