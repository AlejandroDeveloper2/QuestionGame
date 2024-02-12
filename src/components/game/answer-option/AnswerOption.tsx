/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { AnswerOptionProps } from "@models/ComponentPropsModels";
import useQuizMatchStore from "@zustand/quizMatchStore";
import useQuizGameStore from "@zustand/quizGameStore";

import { AnswerBox, AnswerMarkBox } from "./AnswerOption.style";
import { useAudio } from "@hooks/index";

const AnswerOption = ({
  idAnswer,
  answerData,
  answerMark,
}: AnswerOptionProps): JSX.Element => {
  const { quiz, updateQuiz, stopMatch } = useQuizGameStore();
  const { answerStyle, answerQuestion } = useQuizMatchStore();
  const { toggle: toggleWrongAnswerSound } = useAudio(
    "/sounds/wrong-answer-sound.mp3"
  );
  const { toggle: toggleCorrectAnswerSound } = useAudio(
    "/sounds/correct-answer-sound.mp3"
  );

  useEffect(() => {
    if (
      quiz.matchResult === "Incorrecta" ||
      quiz.matchResult === "SinResponder"
    ) {
      toggleWrongAnswerSound();
    } else if (quiz.matchResult === "Correcta") {
      toggleCorrectAnswerSound();
    }
  }, [quiz.matchResult]);

  return (
    <AnswerBox
      background={answerStyle[idAnswer].background}
      color={answerStyle[idAnswer].color}
      bordercolor={answerStyle[idAnswer].bordercolor}
      opacity={answerStyle[idAnswer].opacity}
      onClick={() => {
        answerQuestion(idAnswer, answerData, quiz, updateQuiz, stopMatch);
      }}
    >
      <AnswerMarkBox>
        <span>{answerMark}</span>
      </AnswerMarkBox>
      <p>{answerData.answerText}</p>
    </AnswerBox>
  );
};

export default AnswerOption;
