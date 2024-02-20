import { FaCheck } from "react-icons/fa";
import {
  MdOutlineCancel,
  MdPause,
  MdQuestionMark,
  MdTimelapse,
} from "react-icons/md";

import useQuizGameStore from "@zustand/quizGameStore";
import useQuizMatchStore from "@zustand/quizMatchStore";
import { getCorrectAnswer } from "@utils/functions";

import { BadgeWithLabel, ConsolationAwardForm } from "@components/index";

const QuizStatictis = (): JSX.Element => {
  const { quiz } = useQuizGameStore();
  const { match } = useQuizMatchStore();

  return (
    <>
      <BadgeWithLabel
        label="Estado del timer"
        Icon={quiz.isMatchStarted ? MdTimelapse : MdPause}
        style={{
          backgroundcolor: "var(--primary-color-100)",
          color: "var(--gray)",
        }}
        value={quiz.isMatchStarted ? "Corriendo" : "Pausado"}
      />

      <BadgeWithLabel
        label="Respuesta correcta "
        Icon={FaCheck}
        style={{
          backgroundcolor: "var(--green)",
          color: "var(--white)",
        }}
        value={getCorrectAnswer(match.currentQuestion?.answers)?.answerMark}
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
          backgroundcolor:
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
            : quiz.matchResult === "EnEspera"
            ? "En espera"
            : "Retirado"
        }
      />
      {(quiz.matchResult === "Incorrecta" ||
        quiz.matchResult === "SinResponderRetirado") &&
      quiz.consolationAward === "" ? (
        <ConsolationAwardForm />
      ) : null}
    </>
  );
};

export default QuizStatictis;
