import { create } from "zustand";

import {
  Answer,
  Match,
  MatchResult,
  Question,
  Quiz,
  ServerResponse,
} from "@models/DataModels";
import { QuizMatchStore } from "@models/StoreModels";

import {
  getRandomQuestionsPerCategory,
  shuffleQuestionsAnswer,
} from "@utils/functions";
import { client } from "@config/pocketbase";

import {
  validateAnswer,
  validateAnswerWithDividedHelp,
  validateIsnewAttempt,
} from "@utils/answerQuestionHelpers";
import { initialAnswerStyle } from "@constants/initialAnswerStyles";

const matchId = import.meta.env.VITE_MATCH_ID_PRODUCTION;

const useQuizMatchStore = create<QuizMatchStore>((set, get) => ({
  match: {
    isDividedWildCard: false,
    isCallWildCard: false,
    selectedAnswers: 0,
    timerValue: 0,
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
  },

  setMatch: async (match: Match) => {
    set({ match });
  },
  updateIncorrectAnswer: async () => {
    try {
      const updatedMatch: Match = await client
        .collection("match")
        .update(
          matchId,
          { incorrectAnswers: get().match.incorrectAnswers + 1 },
          { $autoCancel: false }
        );

      set({ match: updatedMatch });
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      console.log(parsedError);
    }
  },
  updateTimerValue: async (timer: number) => {
    try {
      const updatedMatch: Match = await client
        .collection("match")
        .update(matchId, { timerValue: timer }, { $autoCancel: false });
      set({ match: updatedMatch });
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      console.log(parsedError);
    }
  },
  updateTimeTaken: async () => {
    try {
      const updatedMatch: Match = await client
        .collection("match")
        .update(
          matchId,
          { timeTaken: get().match.timeTaken + 1 },
          { $autoCancel: false }
        );
      set({ match: updatedMatch });
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      console.log(parsedError);
    }
  },
  resetAccumulatedEarn: async () => {
    try {
      const updatedMatch: Match = await client
        .collection("match")
        .update(matchId, { accumulatedEarn: 0 }, { $autoCancel: false });
      set({ match: updatedMatch });
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      console.log(parsedError);
    }
  },
  getRandomQuestions: async (quiz: Quiz) => {
    try {
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
        46
      );
      const finalRandomQuestions: Question[] = shuffleQuestionsAnswer(
        basicRandomQuestions.concat(
          intermediateRandomQuestions,
          expertRandomQuestions
        )
      );
      const updatedMatch: Match = await client.collection("match").update(
        matchId,
        {
          randomQuestions: finalRandomQuestions,
          currentQuestion:
            basicRandomQuestions[get().match.currentQuestionIndex],
        },
        { $autoCancel: false }
      );
      set({ match: updatedMatch });
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      console.log(parsedError);
    }
  },
  answerQuestion: async (
    idAnswer: number,
    selectedAnswer: Answer,
    quiz: Quiz,
    updateQuiz: (id: string, matchResult: MatchResult) => Promise<void>,
    stopMatch: (id: string) => Promise<void>
  ) => {
    try {
      /*isDividedWildcard */
      const { selectedAnswers } = validateAnswerWithDividedHelp(get().match);
      /*Validate answer */
      const { correctAnswers, incorrectAnswers, accumulatedEarn, answerStyle } =
        await validateAnswer(
          { ...get().match, selectedAnswers },
          idAnswer,
          selectedAnswer,
          quiz,
          get().resetDividedWildCard,
          updateQuiz,
          stopMatch
        );

      const updatedMatch: Match = await client.collection("match").update(
        matchId,
        {
          selectedAnswers,
          correctAnswers,
          incorrectAnswers,
          accumulatedEarn,
          answerStyle,
        },
        { $autoCancel: false }
      );
      set({ match: updatedMatch });
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      console.log(parsedError);
    }
  },
  updatedCurrentQuestion: async (
    quiz: Quiz,
    updateQuiz: (id: string, matchResult: MatchResult) => Promise<void>
  ) => {
    try {
      /*validate isNewAttempt */
      const { answerStyle, currentQuestion } = await validateIsnewAttempt(
        get().match,
        quiz,
        initialAnswerStyle,
        updateQuiz
      );
      const updatedMatch: Match = await client.collection("match").update(
        matchId,
        {
          answerStyle,
          currentQuestion,
        },
        { $autoCancel: false }
      );
      set({ match: updatedMatch });
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      console.log(parsedError.message);
    }
  },
  nextQuestion: async (
    quiz: Quiz,
    updateQuiz: (id: string, matchResult: MatchResult) => Promise<void>
  ) => {
    try {
      await updateQuiz(quiz.id, "EnEspera");
      const updatedMatch: Match = await client.collection("match").update(
        matchId,
        {
          answerStyle: initialAnswerStyle,
          currentQuestionIndex:
            get().match.currentQuestionIndex <
            get().match.randomQuestions.length
              ? get().match.currentQuestionIndex + 1
              : get().match.currentQuestionIndex,
        },
        { $autoCancel: false }
      );
      set({ match: updatedMatch });
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      console.log(parsedError);
    }
  },
  setConsolationAwardToAccumulatedEarn: async (consolationAward: string) => {
    try {
      const updatedMatch: Match = await client
        .collection("match")
        .update(matchId, {
          accumulatedEarn: window.parseInt(consolationAward),
        });
      set({ match: updatedMatch });
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      console.log(parsedError);
    }
  },
  spendDividedWildCard: async () => {
    try {
      const updatedMatch: Match = await client.collection("match").update(
        matchId,
        {
          isDividedWildCard: true,
          usedWildcards: get().match.usedWildcards + 1,
        },
        { $autoCancel: false }
      );
      set({ match: updatedMatch });
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      console.log(parsedError);
    }
  },
  resetDividedWildCard: async () => {
    try {
      const updatedMatch: Match = await client.collection("match").update(
        matchId,
        {
          isDividedWildCard: false,
          selectedAnswers: 0,
        },
        { $autoCancel: false }
      );
      set({ match: updatedMatch });
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      console.log(parsedError);
    }
  },
  spendCallWildCard: async () => {
    try {
      const updatedMatch: Match = await client.collection("match").update(
        matchId,
        {
          usedWildcards: get().match.usedWildcards + 1,
          isCallWildCard: true,
        },
        { $autoCancel: false }
      );
      set({ match: updatedMatch });
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      console.log(parsedError);
    }
  },
  resetCallWildCard: async () => {
    try {
      const updatedMatch: Match = await client.collection("match").update(
        matchId,
        {
          isCallWildCard: false,
        },
        { $autoCancel: false }
      );
      set({ match: updatedMatch });
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      console.log(parsedError);
    }
  },
  updateMatchStatus: async (
    id: string,
    stopMatch: (id: string) => Promise<void>,
    updateQuiz: (id: string, matchResult: MatchResult) => Promise<void>
  ) => {
    await stopMatch(id);
    await updateQuiz(id, "EnEspera");
  },
  exitMatch: async (quiz: Quiz, leaveGame: (id: string) => Promise<void>) => {
    await leaveGame(quiz.id);
  },
  resetGame: async () => {
    try {
      const updatedMatch: Match = await client.collection("match").update(
        matchId,
        {
          isCallWildCard: false,
          isDividedWildCard: false,
          selectedAnswers: 0,
          timerValue: 0,
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
        },
        { $autoCancel: false }
      );
      set({ match: updatedMatch });
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      console.log(parsedError);
    }
  },
}));

export default useQuizMatchStore;
