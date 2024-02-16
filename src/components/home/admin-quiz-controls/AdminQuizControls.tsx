import { TbProgress } from "react-icons/tb";
import { FaCheckDouble } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";

import useQuizGameStore from "@zustand/quizGameStore";

import { BadgeWithLabel, ButtonWithIcon, Spinner } from "@components/index";
import QuizStatictis from "./QuizStatictis";
import QuizOptions from "./QuizOptions";

import {
  AdminQuizControlsContainer,
  QuestionInfoContainer,
} from "./AdminQuizControls.style";

const AdminQuizControls = (): JSX.Element => {
  const { quiz, finishQuiz, isLoading } = useQuizGameStore();

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
          <QuizStatictis />
          <QuizOptions />
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
