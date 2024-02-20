import useQuizGameStore from "@zustand/quizGameStore";
import useQuizMatchStore from "@zustand/quizMatchStore";
import { getAnswerMark } from "@utils/functions";

import { ButtonWithLabel } from "@components/index";

import {
  AnswerOptionButtonStyle,
  AnswerOptions,
} from "./AdminQuizControls.style";

const QuizAnswers = (): JSX.Element => {
  const { quiz, updateQuiz, stopMatch } = useQuizGameStore();
  const { answerQuestion, match } = useQuizMatchStore();

  const answerMarks = getAnswerMark();

  return (
    <AnswerOptions>
      <p>Opciones de respuesta</p>
      <ol>
        {match.currentQuestion
          ? match.currentQuestion.answers?.map((answer, i) => (
              <ButtonWithLabel
                disabled={
                  !quiz.isMatchStarted &&
                  quiz.matchResult !== "SinResponder" &&
                  !match.isDividedWildCard
                }
                type="button"
                label={String(answerMarks[i])}
                key={i}
                style={AnswerOptionButtonStyle}
                title={`Opción ${answerMarks[i]}`}
                onClick={() => {
                  answerQuestion(i, answer, quiz, updateQuiz, stopMatch);
                }}
              />
            ))
          : null}
      </ol>
    </AnswerOptions>
  );
};

export default QuizAnswers;
