import { FaArrowRightLong } from "react-icons/fa6";
import { TbDoorExit } from "react-icons/tb";

import useQuizGameStore from "@zustand/quizGameStore";
import useQuizMatchStore from "@zustand/quizMatchStore";

import { ButtonIconOnly } from "@components/index";

import {
  MatchControlsContainer,
  ContinueGameButtonStyle,
  StopGameButtonStyle,
} from "./AdminQuizControls.style";

const QuizMatchControls = (): JSX.Element => {
  const { quiz, leaveGame, updateQuiz } = useQuizGameStore();
  const { match, nextQuestion, exitMatch } = useQuizMatchStore();

  return (
    <MatchControlsContainer>
      <p>Controles de la partida</p>
      <ol>
        <ButtonIconOnly
          disabled={
            (quiz.matchResult === "EnEspera" && !quiz.isGameCompleted) ||
            (match.currentQuestionIndex >= match.randomQuestions?.length - 1 &&
              !quiz.isGameCompleted &&
              quiz.matchResult !== "EnEspera") ||
            quiz.isGameCompleted ||
            quiz.matchResult === "SinResponder" ||
            quiz.matchResult === "Incorrecta" ||
            quiz.matchResult === "SinResponderRetirado"
          }
          type="button"
          Icon={FaArrowRightLong}
          style={ContinueGameButtonStyle}
          title="Continuar con la siguiente pregunta"
          onClick={() => nextQuestion(quiz, updateQuiz)}
        />
        <ButtonIconOnly
          disabled={
            quiz.matchResult === "EnEspera" ||
            quiz.matchResult === "SinResponder" ||
            (quiz.isGameCompleted && quiz.consolationAward === "") ||
            (quiz.matchResult === "Incorrecta" &&
              quiz.consolationAward === "") ||
            quiz.isGameCompleted ||
            (quiz.matchResult === "SinResponderRetirado" &&
              quiz.consolationAward === "")
          }
          type="button"
          Icon={TbDoorExit}
          style={StopGameButtonStyle}
          title="Retirarse del juego!"
          onClick={() => exitMatch(quiz, leaveGame)}
        />
      </ol>
    </MatchControlsContainer>
  );
};

export default QuizMatchControls;
