import { Answer, Difficulty } from "./DataModels";

type FieldErrorType = {
  message: string;
  error: boolean;
};

interface WrongInput {
  [x: string]: FieldErrorType;
}

interface StartFormData {
  username: string;
}

interface AddQuestionFormData {
  name: string;
  questionBody: string;
  answers: Answer[];
  time: number;
  reward: number;
  category: string;
  difficulty: Difficulty;
}

interface AddAnswerFormData {
  answerText: string;
  isCorrectAnswer: boolean;
}

interface AddCategoryFormData {
  name: string;
}

interface ConsolationAwardFormData {
  consolationAward: number;
}

interface LoginFormData {
  username: string;
  password: string;
}

export type {
  FieldErrorType,
  WrongInput,
  StartFormData,
  AddQuestionFormData,
  AddAnswerFormData,
  AddCategoryFormData,
  ConsolationAwardFormData,
  LoginFormData,
};
