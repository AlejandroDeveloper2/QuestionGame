import {
  AddQuestionFormData,
  AddAnswerFormData,
  AddCategoryFormData,
} from "./FormDataModel";

import { AnswerOptionStyleProps } from "./StylePropsModels";

type ScreenType = "desktop" | "tablet" | "mobile";
type Difficulty = "Basico" | "Intermedio" | "Experto";
type AnswerMark = "A" | "B" | "C" | "D";
type MatchResult =
  | "Correcta"
  | "Incorrecta"
  | "SinResponder"
  | "EnEspera"
  | "SinResponderRetirado";

interface Answer extends AddAnswerFormData {}

interface Question extends AddQuestionFormData {
  id: string;
}

interface Category extends AddCategoryFormData {
  id: string;
}

interface Quiz {
  id: string;
  playerName: string;
  questions: Question[];
  matchResult: MatchResult;
  consolationAward: string;
  isMatchStarted: boolean;
  isNewAttempt: boolean;
  isQuizStarted: boolean;
  isQuizFinished: boolean;
  isGameCompleted: boolean;
}

interface Match {
  isDividedWildCard: boolean;
  isCallWildCard: boolean;
  selectedAnswers: number;
  timerValue: number;
  currentQuestionIndex: number;
  correctAnswers: number;
  incorrectAnswers: number;
  accumulatedEarn: number;
  usedWildcards: number;
  timeTaken: number;
  randomQuestions: Question[];
  currentQuestion: Question;
  answerStyle: AnswerOptionStyleProps[];
}

interface Auth {
  token: string | null;
  record: {
    username: string;
    email: string;
  };
}

interface ServerResponse {
  message: string;
  code: number;
}

export type {
  MatchResult,
  ScreenType,
  Difficulty,
  Answer,
  Question,
  Category,
  AnswerMark,
  Match,
  Quiz,
  Auth,
  ServerResponse,
};
