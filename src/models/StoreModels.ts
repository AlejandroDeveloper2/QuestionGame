import { NavigateFunction } from "react-router-dom";

import {
  Answer,
  Category,
  Match,
  MatchResult,
  Question,
  Quiz,
} from "./DataModels";
import {
  AddCategoryFormData,
  AddQuestionFormData,
  ConsolationAwardFormData,
} from "./FormDataModel";

interface QuizGameStore {
  quiz: Quiz;
  isLoading: boolean;
  setPlayerName: (playerName: string) => Promise<void>;
  setQuiz: (quiz: Quiz) => void;
  startQuiz: (id: string, questionsLength: number) => Promise<void>;
  finishQuiz: (id: string) => Promise<void>;
  leaveGame: (id: string) => Promise<void>;
  resetQuiz: (
    id: string,
    navigate: NavigateFunction,
    resetGame: () => void
  ) => Promise<void>;
  startMatch: (id: string) => Promise<void>;
  stopMatch: (id: string) => Promise<void>;
  updateQuiz: (id: string, matchResult: MatchResult) => Promise<void>;
  giveNewAttempt: (id: string, isNewAttempt: boolean) => Promise<void>;
  setConsolationAward: (
    id: string,
    award: ConsolationAwardFormData
  ) => Promise<void>;
  restartQuiz: (id: string) => Promise<void>;
}

interface QuestionStore {
  isLoading: boolean;
  questions: Question[];
  updateQuizQuestions: (questions: Question[]) => Promise<void>;
  getAllQuestions: () => Promise<void>;
  addQuestion: (question: AddQuestionFormData) => Promise<void>;
  removeQuestion: (id: string) => Promise<void>;
  editQuestion: (
    id: string,
    updatedQuestion: AddQuestionFormData
  ) => Promise<void>;
}

interface QuizMatchStore {
  match: Match;
  setMatch: (match: Match) => void;
  updateIncorrectAnswer: () => Promise<void>;
  updateTimerValue: (timer: number) => Promise<void>;
  updateTimeTaken: () => Promise<void>;
  resetAccumulatedEarn: () => Promise<void>;
  getRandomQuestions: (quiz: Quiz) => Promise<void>;
  answerQuestion: (
    idAnswer: number,
    selectedAnswer: Answer,
    quiz: Quiz,
    updateQuiz: (id: string, matchResult: MatchResult) => Promise<void>,
    stopMatch: (id: string) => Promise<void>
  ) => Promise<void>;
  updatedCurrentQuestion: (
    quiz: Quiz,
    updateQuiz: (id: string, matchResult: MatchResult) => Promise<void>
  ) => Promise<void>;
  nextQuestion: (
    quiz: Quiz,
    updateQuiz: (id: string, matchResult: MatchResult) => Promise<void>
  ) => Promise<void>;
  spendDividedWildCard: () => Promise<void>;
  resetDividedWildCard: () => Promise<void>;
  spendCallWildCard: () => Promise<void>;
  resetCallWildCard: () => Promise<void>;
  updateMatchStatus: (
    id: string,
    stopMatch: (id: string) => Promise<void>,
    updateQuiz: (id: string, matchResult: MatchResult) => Promise<void>
  ) => Promise<void>;
  setConsolationAwardToAccumulatedEarn: (
    consolationAward: string
  ) => Promise<void>;
  exitMatch: (
    quiz: Quiz,
    leaveGame: (id: string) => Promise<void>
  ) => Promise<void>;
  resetGame: () => Promise<void>;
}

interface CategoryStore {
  isLoading: boolean;
  categories: Category[];
  getAllCategories: () => Promise<void>;
  addCategory: (category: AddCategoryFormData) => Promise<void>;
  removeCategory: (id: string) => Promise<void>;
  editCategory: (
    id: string,
    updatedCategory: AddCategoryFormData
  ) => Promise<void>;
}

export type { QuizGameStore, QuestionStore, QuizMatchStore, CategoryStore };
