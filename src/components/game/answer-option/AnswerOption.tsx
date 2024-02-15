/* eslint-disable react-hooks/exhaustive-deps */
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
  const { quiz, updateQuiz, stopMatch, leaveGame } = useQuizGameStore();
  const { answerStyle, answerQuestion } = useQuizMatchStore();
  const { toggle: toggleWrongAnswerSound } = useAudio(
    "/sounds/wrong-answer-sound.mp3"
  );
  const { toggle: toggleCorrectAnswerSound } = useAudio(
    "/sounds/correct-answer-sound.mp3"
  );

  return (
    <AnswerBox
      background={answerStyle[idAnswer].background}
      color={answerStyle[idAnswer].color}
      bordercolor={answerStyle[idAnswer].bordercolor}
      opacity={answerStyle[idAnswer].opacity}
      onClick={() => {
        if (answerData.isCorrectAnswer) {
          toggleCorrectAnswerSound();
        } else {
          toggleWrongAnswerSound();
        }
        answerQuestion(
          idAnswer,
          answerData,
          quiz,
          0,
          updateQuiz,
          stopMatch,
          leaveGame
        );
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
