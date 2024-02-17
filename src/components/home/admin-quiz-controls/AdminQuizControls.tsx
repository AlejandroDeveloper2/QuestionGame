import { TbProgress } from "react-icons/tb";
import { FaCheckDouble } from "react-icons/fa";
import { IoExitOutline, IoReloadOutline } from "react-icons/io5";

import useQuizGameStore from "@zustand/quizGameStore";

import { BadgeWithLabel, ButtonWithIcon, Spinner } from "@components/index";
import QuizStatictis from "./QuizStatictis";
import QuizOptions from "./QuizOptions";

import {
  AdminQuizControlsContainer,
  AdminQuizControlsFooter,
  FinishGameButtonStyle,
  QuestionInfoContainer,
  RestartGameButtonStyle,
} from "./AdminQuizControls.style";

const AdminQuizControls = (): JSX.Element => {
  const { quiz, finishQuiz, restartQuiz, isLoading } = useQuizGameStore();

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
            backgroundcolor: "var(--primary-color-base)",
            color: "var(--white)",
          }}
          value={!quiz.isGameCompleted ? "En progreso" : "Terminado"}
        />
        <QuestionInfoContainer>
          <QuizStatictis />
          <QuizOptions />
        </QuestionInfoContainer>
      </AdminQuizControlsContainer>
      <AdminQuizControlsFooter>
        <ButtonWithIcon
          disabled={!quiz.isGameCompleted}
          type="button"
          label="Terminar Quiz"
          Icon={IoExitOutline}
          style={FinishGameButtonStyle}
          title="Finalizar con el quiz"
          onClick={() => {
            finishQuiz(quiz.id);
          }}
        />
        <ButtonWithIcon
          disabled={!quiz.isGameCompleted}
          type="button"
          label="Reiniciar Quiz"
          Icon={IoReloadOutline}
          style={RestartGameButtonStyle}
          title="Reiniciar juego"
          onClick={() => {
            restartQuiz(quiz.id, true);
          }}
        />
      </AdminQuizControlsFooter>
    </>
  );
};

export default AdminQuizControls;
