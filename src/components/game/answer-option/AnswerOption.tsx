/* eslint-disable react-hooks/exhaustive-deps */
import { AnswerOptionProps } from "@models/ComponentPropsModels";
import useQuizMatchStore from "@zustand/quizMatchStore";
import useQuizGameStore from "@zustand/quizGameStore";

import { AnswerBox, AnswerMarkBox } from "./AnswerOption.style";

const AnswerOption = ({
  idAnswer,
  answerData,
  answerMark,
}: AnswerOptionProps): JSX.Element => {
  const { quiz, updateQuiz, stopMatch } = useQuizGameStore();
  const { match, answerQuestion } = useQuizMatchStore();

  return (
    <AnswerBox
      background={match.answerStyle[idAnswer]?.background}
      color={match.answerStyle[idAnswer]?.color}
      bordercolor={match.answerStyle[idAnswer]?.bordercolor}
      opacity={match.answerStyle[idAnswer]?.opacity}
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
