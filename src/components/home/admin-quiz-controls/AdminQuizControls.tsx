/* eslint-disable react-hooks/exhaustive-deps */
import { TbProgress } from "react-icons/tb";
import { FaCheck } from "react-icons/fa6";
import { FaCheckDouble } from "react-icons/fa";
import {
  MdTimer,
  MdTimelapse,
  MdPause,
  MdQuestionMark,
  MdOutlineCancel,
  MdOutlineRestartAlt,
} from "react-icons/md";
import { GrNew } from "react-icons/gr";
import { IoExitOutline } from "react-icons/io5";

import useQuizGameStore from "@zustand/quizGameStore";
import useQuizMatchStore from "@zustand/quizMatchStore";
import { getCorrectAnswer } from "@utils/functions";

import {
  BadgeWithLabel,
  ButtonIconOnly,
  ButtonWithIcon,
  ConsolationAwardForm,
  Spinner,
} from "@components/index";

import {
  AdminQuizControlsContainer,
  QuestionInfoContainer,
  QuestionOptions,
} from "./AdminQuizControls.style";

const AdminQuizControls = (): JSX.Element => {
  const {
    quiz,
    finishQuiz,
    startMatch,
    stopMatch,
    updateQuiz,
    giveNewAttempt,
    isLoading,
  } = useQuizGameStore();
  const { incorrectAnswers, updateMatchStatus } = useQuizMatchStore();

  return isLoading ? (
    <Spinner
      message="Actualizando estado del quiz.."
      color="var(--primary-color-base)"
    />
  ) : (
    <>
      <AdminQuizControlsContainer>
        <BadgeWithLabel
          label="Estado del quiz"
          Icon={!quiz.isGameCompleted ? TbProgress : FaCheckDouble}
          style={{
            backgroundColor: "var(--primary-color-base)",
            color: "var(--white)",
          }}
          value={!quiz.isGameCompleted ? "En progreso" : "Terminado"}
        />
        <QuestionInfoContainer>
          <BadgeWithLabel
            label="Estado del timer"
            Icon={quiz.isMatchStarted ? MdTimelapse : MdPause}
            style={{
              backgroundColor: "var(--primary-color-100)",
              color: "var(--gray)",
            }}
            value={quiz.isMatchStarted ? "Corriendo" : "Pausado"}
          />

          <BadgeWithLabel
            label="Respuesta correcta "
            Icon={FaCheck}
            style={{
              backgroundColor: "var(--green)",
              color: "var(--white)",
            }}
            value={getCorrectAnswer(quiz.currentQuestion?.answers)?.answerMark}
          />

          <BadgeWithLabel
            label="Respuesta del jugador"
            Icon={
              quiz.matchResult === "SinResponder"
                ? MdQuestionMark
                : quiz.matchResult === "Correcta"
                ? FaCheck
                : quiz.matchResult === "Incorrecta"
                ? MdOutlineCancel
                : MdTimelapse
            }
            style={{
              backgroundColor:
                quiz.matchResult === "SinResponder"
                  ? "var(--orange)"
                  : quiz.matchResult === "Correcta"
                  ? "var(--green)"
                  : quiz.matchResult === "Incorrecta"
                  ? "var(--red)"
                  : "var(--gray)",
              color: "var(--white)",
            }}
            value={
              quiz.matchResult === "SinResponder"
                ? "Sin responder"
                : quiz.matchResult === "Incorrecta"
                ? "Incorrecta"
                : quiz.matchResult === "Correcta"
                ? "Correcta"
                : "En espera"
            }
          />
          {quiz.matchResult === "Incorrecta" ? <ConsolationAwardForm /> : null}
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
              disabled={
                quiz.isGameCompleted || quiz.matchResult !== "SinResponder"
              }
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
          </QuestionOptions>
        </QuestionInfoContainer>
      </AdminQuizControlsContainer>
      <ButtonWithIcon
        disabled={!quiz.isGameCompleted}
        type="button"
        label="Terminar Quiz"
        Icon={IoExitOutline}
        style={{
          background: "var(--red)",
          color: "var(--white)",
          width: {
            sm: 300,
            md: 400,
            lg: 500,
          },
          height: {
            sm: 78,
            md: 84,
            lg: 84,
          },
        }}
        title="Finalizar con el quiz"
        onClick={() => {
          finishQuiz(quiz.id);
        }}
      />
    </>
  );
};

export default AdminQuizControls;
