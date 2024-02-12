import { Answer, Difficulty } from "./DataModels";

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

export type {
  StartFormData,
  AddQuestionFormData,
  AddAnswerFormData,
  AddCategoryFormData,
};
