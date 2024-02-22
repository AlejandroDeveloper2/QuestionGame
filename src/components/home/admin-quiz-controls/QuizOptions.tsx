import { MdOutlineRestartAlt, MdTimer } from "react-icons/md";
import { GrNew } from "react-icons/gr";
import { IoExit } from "react-icons/io5";
import { FaPauseCircle } from "react-icons/fa";

import { ButtonIconOnly } from "@components/index";

import useQuizGameStore from "@zustand/quizGameStore";
import useQuizMatchStore from "@zustand/quizMatchStore";

import {
  LeaveGameButtonStyle,
  NewAttemptButtonStyle,
  QuestionOptions,
  RestartQuestionButtonStyle,
  StartTimerButtonStyle,
  StopTimerButtonStyle,
} from "./AdminQuizControls.style";

const QuizOptions = (): JSX.Element => {
  const { quiz, startMatch, giveNewAttempt, stopMatch, updateQuiz } =
    useQuizGameStore();
  const { match, updateMatchStatus } = useQuizMatchStore();

  return (
    <QuestionOptions>
      <ButtonIconOnly
        disabled={
          quiz.isGameCompleted ||
          quiz.isMatchStarted ||
          quiz.matchResult !== "EnEspera"
        }
        type="button"
        Icon={MdTimer}
        style={StartTimerButtonStyle}
        title="Iniciar temporizador"
        onClick={() => {
          startMatch(quiz.id);
        }}
      />
      <ButtonIconOnly
        disabled={
          quiz.isGameCompleted ||
          !quiz.isMatchStarted ||
          quiz.matchResult !== "EnEspera"
        }
        type="button"
        Icon={FaPauseCircle}
        style={StopTimerButtonStyle}
        title="Pausar temporizador"
        onClick={() => {
          stopMatch(quiz.id);
        }}
      />
      <ButtonIconOnly
        disabled={
          quiz.isGameCompleted ||
          quiz.isNewAttempt ||
          match.incorrectAnswers > 2 ||
          quiz.matchResult === "Correcta" ||
          quiz.matchResult === "EnEspera" ||
          quiz.matchResult === "SinResponderRetirado" ||
          quiz.consolationAward !== ""
        }
        type="button"
        Icon={GrNew}
        style={NewAttemptButtonStyle}
        title="Conceder otra oportunidad"
        onClick={() => {
          giveNewAttempt(quiz.id, true);
        }}
      />
      <ButtonIconOnly
        disabled={quiz.isGameCompleted || quiz.matchResult !== "SinResponder"}
        type="button"
        Icon={MdOutlineRestartAlt}
        style={RestartQuestionButtonStyle}
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
        style={LeaveGameButtonStyle}
        onClick={() => updateQuiz(quiz.id, "SinResponderRetirado")}
      />
    </QuestionOptions>
  );
};

export default QuizOptions;
