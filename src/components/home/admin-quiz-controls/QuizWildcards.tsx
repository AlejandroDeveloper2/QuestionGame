import { FaDivide } from "react-icons/fa";
import { IoCall } from "react-icons/io5";

import useQuizGameStore from "@zustand/quizGameStore";

import { ButtonIconOnly } from "@components/index";

import {
  CallButtonStyle,
  DividedButtonStyle,
  QuizWildcardsContainer,
} from "./AdminQuizControls.style";
import useQuizMatchStore from "@zustand/quizMatchStore";
import { useCallTimer, useFloatPop } from "@hooks/index";

const QuizWildcards = (): JSX.Element => {
  const { quiz, stopMatch } = useQuizGameStore();
  const { match, spendDividedWildCard, spendCallWildCard } =
    useQuizMatchStore();

  useCallTimer();
  useFloatPop();

  return (
    <QuizWildcardsContainer>
      <p>Comodines</p>
      <ol>
        <ButtonIconOnly
          disabled={
            match.isDividedWildCard ||
            quiz.isGameCompleted ||
            !quiz.isMatchStarted
          }
          type="button"
          Icon={FaDivide}
          style={DividedButtonStyle}
          title="Comodin 50/50"
          onClick={() => {
            stopMatch(quiz.id);
            spendDividedWildCard();
          }}
        />
        <ButtonIconOnly
          disabled={
            match.isCallWildCard || quiz.isGameCompleted || !quiz.isMatchStarted
          }
          type="button"
          Icon={IoCall}
          style={CallButtonStyle}
          title="Comodin llamada a un amigo"
          onClick={() => {
            spendCallWildCard();
            stopMatch(quiz.id);
          }}
        />
      </ol>
    </QuizWildcardsContainer>
  );
};

export default QuizWildcards;
