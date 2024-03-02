import { TbProgress } from "react-icons/tb";
import { FaCheckDouble } from "react-icons/fa";
import { IoExitOutline, IoReloadOutline } from "react-icons/io5";

import useQuizGameStore from "@zustand/quizGameStore";
import useQuizMatchStore from "@zustand/quizMatchStore";

import { BadgeWithLabel, ButtonWithIcon } from "@components/index";
import QuizStatictis from "./QuizStatictis";
import QuizOptions from "./QuizOptions";
import QuizAnswers from "./QuizAnswers";
import QuizMatchControls from "./QuizMatchControls";
import QuizWildcards from "./QuizWildcards";

import {
  AdminQuizControlsContainer,
  AdminQuizControlsFooter,
  AnswersWildCardContainer,
  FinishGameButtonStyle,
  QuestionInfoContainer,
  RestartGameButtonStyle,
} from "./AdminQuizControls.style";

const AdminQuizControls = (): JSX.Element => {
  const { quiz, finishQuiz, restartQuiz } = useQuizGameStore();
  const { resetGame, getRandomQuestions } = useQuizMatchStore();

  return (
    <>
      <AdminQuizControlsContainer>
        <BadgeWithLabel
          id="badge-quiz-status"
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
          <AnswersWildCardContainer>
            <QuizWildcards />
            <QuizAnswers />
          </AnswersWildCardContainer>
          <QuizMatchControls />
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
            restartQuiz(quiz, resetGame, getRandomQuestions);
          }}
        />
      </AdminQuizControlsFooter>
    </>
  );
};

export default AdminQuizControls;
