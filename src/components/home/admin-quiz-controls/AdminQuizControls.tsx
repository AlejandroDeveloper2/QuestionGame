import { TbProgress } from "react-icons/tb";
import { FaCheck } from "react-icons/fa6";
import {
  MdTimer,
  MdTimelapse,
  MdPause,
  MdQuestionMark,
  MdOutlineCancel,
} from "react-icons/md";
import { GrNew } from "react-icons/gr";
import { IoExitOutline } from "react-icons/io5";

import useQuizGameStore from "@zustand/quizGameStore";
import useQuizMatchStore from "@zustand/quizMatchStore";

import {
  BadgeWithLabel,
  ButtonIconOnly,
  ButtonWithIcon,
  Spinner,
} from "@components/index";

import {
  AdminQuizControlsContainer,
  QuestionInfoContainer,
  QuestionOptions,
} from "./AdminQuizControls.style";

const AdminQuizControls = (): JSX.Element => {
  const { quiz, finishQuiz, startMatch, giveNewAttempt, isLoading } =
    useQuizGameStore();
  const { incorrectAnswers } = useQuizMatchStore();

  return isLoading ? (
    <Spinner
      message="Actualizando estado del quiz.."
      color="var(--primary-color-base)"
    />
  ) : (
    <AdminQuizControlsContainer>
      <BadgeWithLabel
        label="Estado del quiz"
        Icon={TbProgress}
        style={{
          backgroundColor: "var(--primary-color-base)",
          color: "var(--white)",
        }}
        value={!quiz.isQuizFinished ? "En progreso" : "Terminado"}
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
        <QuestionOptions>
          <ButtonIconOnly
            disabled={quiz.isGameCompleted || quiz.isMatchStarted}
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
              quiz.matchResult !== "Incorrecta"
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
        </QuestionOptions>
      </QuestionInfoContainer>
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
    </AdminQuizControlsContainer>
  );
};

export default AdminQuizControls;
