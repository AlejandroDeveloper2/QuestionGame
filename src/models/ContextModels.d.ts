import { Question, Answer } from "./DataModels";
import { AnswerOptionStyleProps } from "./StylePropsModels";

interface ContextProps {
  children: React.ReactNode | React.ReactNode[];
}

interface QuizMatchContextProps {
  accumulatedEarn: number;
  usedWildcards: number;
  randomQuestions: Question[];
  currentQuestion: Question;
  answerStyle: AnswerOptionStyleProps;
  getRandomQuestions: () => void;
  answerQuestion: (selectedAnswer: Answer) => void;
  nextQuestion: (idQuestion: number) => void;
  useDividedWildCard: () => void;
  useCallWildCard: (openModal: () => void, closeModal: () => void) => void;
  exitMatch: () => void;
}

export type { ContextProps, QuizMatchContextProps };
