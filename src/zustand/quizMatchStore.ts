import { create } from "zustand";

import { Answer, MatchResult, Question, Quiz } from "@models/DataModels";
import { QuizMatchStore } from "@models/StoreModels";
import { AnswerOptionStyleProps } from "@models/StylePropsModels";
import {
  getRandomQuestionsPerCategory,
  giveNewAttempt,
  shuffleQuestionsAnswer,
} from "@utils/functions";

const initialAnswerStyle: AnswerOptionStyleProps[] = Array(4).fill({
  background: "var(--primary-color-100)",
  color: "var(--gray)",
  bordercolor: "var(--primary-color-300)",
  opacity: 1,
});

const useQuizMatchStore = create<QuizMatchStore>((set, get) => ({
  currentQuestionIndex: 0,
  correctAnswers: 0,
  incorrectAnswers: 0,
  accumulatedEarn: 0,
  usedWildcards: 0,
  timeTaken: 0,
  randomQuestions: [],
  currentQuestion: {
    id: "",
    name: "",
    questionBody: "",
    answers: [],
    time: 0,
    reward: 0,
    category: "",
    difficulty: "Basico",
  },
  answerStyle: initialAnswerStyle,
  updateTimeTaken: () => {
    set(({ timeTaken }) => ({ timeTaken: timeTaken + 1 }));
  },
  resetAccumulatedEarn: () => {
    set({ accumulatedEarn: 0 });
  },
  getRandomQuestions: (quiz: Quiz) => {
    const basicRandomQuestions: Question[] = getRandomQuestionsPerCategory(
      quiz.questions,
      "Basico",
      5
    );
    const intermediateRandomQuestions: Question[] =
      getRandomQuestionsPerCategory(quiz.questions, "Intermedio", 5);
    const expertRandomQuestions: Question[] = getRandomQuestionsPerCategory(
      quiz.questions,
      "Experto",
      5
    );
    const finalRandomQuestions: Question[] = shuffleQuestionsAnswer(
      basicRandomQuestions.concat(
        intermediateRandomQuestions,
        expertRandomQuestions
      )
    );

    set({ randomQuestions: finalRandomQuestions });
    set(({ currentQuestionIndex }) => ({
      currentQuestion: basicRandomQuestions[currentQuestionIndex],
    }));
  },
  answerQuestion: async (
    idAnswer: number,
    selectedAnswer: Answer,
    quiz: Quiz,
    updateQuiz: (id: string, matchResult: MatchResult) => Promise<void>,
    stopMatch: (id: string) => Promise<void>
  ) => {
    await stopMatch(quiz.id);
    if (selectedAnswer.isCorrectAnswer) {
      await updateQuiz(quiz.id, "Correcta");
      set(({ correctAnswers }) => ({ correctAnswers: correctAnswers + 1 }));
      if (!quiz.isNewAttempt) {
        set(({ accumulatedEarn, currentQuestion }) => ({
          accumulatedEarn: accumulatedEarn + currentQuestion.reward,
        }));
      }
      const newStyles = get().answerStyle.map((style, i) => {
        if (idAnswer === i)
          return {
            background: "var(--green)",
            color: "var(--white)",
            bordercolor: "var(--white)",
            opacity: 1,
          };
        return style;
      });
      set({ answerStyle: newStyles });
    } else {
      await updateQuiz(quiz.id, "Incorrecta");
      set(({ incorrectAnswers }) => ({
        incorrectAnswers: incorrectAnswers + 1,
      }));
      set({ accumulatedEarn: 0 });
      const newStyles = get().answerStyle.map((style, i) => {
        if (idAnswer === i)
          return {
            background: "var(--red)",
            color: "var(--white)",
            bordercolor: "var(--white)",
            opacity: 1,
          };
        return style;
      });
      set({ answerStyle: newStyles });
    }
  },
  updatedCurrentQuestion: async (
    quiz: Quiz,
    updateQuiz: (id: string, matchResult: MatchResult) => Promise<void>
  ) => {
    if (quiz.isNewAttempt) {
      await updateQuiz(quiz.id, "EnEspera");
      set({ answerStyle: initialAnswerStyle });
      set({ currentQuestion: giveNewAttempt(get().randomQuestions) });
      return;
    }
    set(({ randomQuestions, currentQuestionIndex }) => ({
      currentQuestion: randomQuestions[currentQuestionIndex],
    }));
  },
  nextQuestion: async (
    quiz: Quiz,
    updateQuiz: (id: string, matchResult: MatchResult) => Promise<void>
  ) => {
    set({ answerStyle: initialAnswerStyle });
    await updateQuiz(quiz.id, "EnEspera");
    if (get().currentQuestionIndex < get().randomQuestions.length) {
      set(({ currentQuestionIndex }) => ({
        currentQuestionIndex: currentQuestionIndex + 1,
      }));
    }
  },
  spendDividedWildCard: () => {
    set(({ usedWildcards }) => ({
      usedWildcards: usedWildcards + 1,
    }));
    let counterWrongAnswers: number = 0;
    const answerStyleCopy = get().answerStyle;
    const finalAnswerStyle: AnswerOptionStyleProps[] = [];
    get().currentQuestion.answers.forEach((answer, i) => {
      if (!answer.isCorrectAnswer && counterWrongAnswers < 2) {
        counterWrongAnswers += 1;
        const style = { ...answerStyleCopy[i], opacity: 0 };
        finalAnswerStyle.push(style);
      } else {
        const style = { ...answerStyleCopy[i], opacity: 1 };
        finalAnswerStyle.push(style);
      }
    });
    set({ answerStyle: finalAnswerStyle });
  },
  spendCallWildCard: (openModal: () => void, closeModal: () => void) => {
    set(({ usedWildcards }) => ({
      usedWildcards: usedWildcards + 1,
    }));
    openModal();
    window.setTimeout(() => {
      closeModal();
    }, 20000);
  },
  exitMatch: async (quiz: Quiz, leaveGame: (id: string) => Promise<void>) => {
    await leaveGame(quiz.id);
  },
  resetGame: () => {
    set({
      incorrectAnswers: 0,
      currentQuestionIndex: 0,
      correctAnswers: 0,
      accumulatedEarn: 0,
      usedWildcards: 0,
      answerStyle: initialAnswerStyle,
      timeTaken: 0,
      randomQuestions: [],
      currentQuestion: {
        id: "",
        name: "",
        questionBody: "",
        answers: [],
        time: 0,
        reward: 0,
        category: "",
        difficulty: "Basico",
      },
    });
  },
}));

export default useQuizMatchStore;
