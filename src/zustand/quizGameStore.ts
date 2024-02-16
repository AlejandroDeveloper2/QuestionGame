import { create } from "zustand";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";

import { QuizGameStore } from "@models/StoreModels";
import {
  MatchResult,
  Quiz,
  ServerResponse,
  Question,
} from "@models/DataModels";

import { client } from "@config/pocketbase";
import toastOptions from "@constants/toastOptions";
import { ConsolationAwardFormData } from "@models/FormDataModel";

const useQuizGameStore = create<QuizGameStore>((set) => ({
  isLoading: false,
  quiz: {
    id: "",
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
    questions: [],
    matchResult: "EnEspera",
    consolationAward: 0,
    isQuizStarted: false,
    isQuizFinished: false,
    isMatchStarted: false,
    isGameCompleted: false,
    isNewAttempt: false,
  },
  setQuiz: async (quiz: Quiz) => {
    set({ quiz });
  },
  startQuiz: async (id: string, questionsLength: number) => {
    /*La ejecuta el Admin */
    if (questionsLength > 0) {
      try {
        const updatedQuiz: Quiz = await client
          .collection("quiz")
          .update(id, { isQuizStarted: true }, { $autoCancel: false });
        set({ quiz: updatedQuiz });
        toast.success("Quiz Iniciado!", toastOptions);
      } catch (_e: unknown) {
        const parsedError = _e as ServerResponse;
        toast.error("Hubo un error al iniciar el quiz!", toastOptions);
        console.log(parsedError);
      }
    } else {
      toast.warning(
        "¡No se puede iniciar el quiz al menos registra 60 preguntas!",
        toastOptions
      );
    }
  },

  finishQuiz: async (id: string) => {
    /*La ejecuta el Admin */
    try {
      const updatedQuiz: Quiz = await client.collection("quiz").update(
        id,
        {
          isQuizStarted: false,
          isQuizFinished: true,
        },
        { $autoCancel: false }
      );
      set({ quiz: updatedQuiz });
      toast.success("Quiz Finalizado!", toastOptions);
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      toast.error("Hubo un error al finalizar el quiz!", toastOptions);
      console.log(parsedError);
    }
  },
  resetQuiz: async (
    id: string,
    navigate: NavigateFunction,
    resetGame: () => void
  ) => {
    resetGame();
    try {
      const updatedQuiz: Quiz = await client.collection("quiz").update(
        id,
        {
          isQuizFinished: false,
          isGameCompleted: false,
          isMatchStarted: false,
          isNewAttempt: false,
          matchResult: "EnEspera",
          consolationAward: 0,
        },
        { $autoCancel: false }
      );
      set({ quiz: updatedQuiz });
      navigate("/");
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      console.log(parsedError);
    }
  },
  updateQuiz: async (id: string, matchResult: MatchResult) => {
    /*La ejecuta el player al marcar una opcion de respuesta */
    set({ isLoading: true });
    try {
      const updatedQuiz: Quiz = await client
        .collection("quiz")
        .update(id, { matchResult }, { $autoCancel: false });
      set({ quiz: updatedQuiz });
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      console.log(parsedError);
    } finally {
      set({ isLoading: false });
    }
  },
  leaveGame: async (id: string) => {
    try {
      const updatedQuiz: Quiz = await client
        .collection("quiz")
        .update(id, { isGameCompleted: true }, { $autoCancel: false });
      set({ quiz: updatedQuiz });
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      console.log(parsedError);
    }
  },
  startMatch: async (id: string) => {
    /*La ejecuta el admin para iniciar el conteo regresivo */
    set({ isLoading: true });
    try {
      const updatedQuiz: Quiz = await client
        .collection("quiz")
        .update(id, { isMatchStarted: true }, { $autoCancel: false });
      set({ quiz: updatedQuiz });
      toast.success("Conteo regresivo iniciado!", toastOptions);
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      toast.error(
        "Hubo un error al iniciar el conteo regresivo!",
        toastOptions
      );
      console.log(parsedError);
    } finally {
      set({ isLoading: false });
    }
  },
  stopMatch: async (id: string) => {
    /*La ejecuta el player al seleccionar una opcion de respuesta */
    set({ isLoading: true });
    try {
      const updatedQuiz: Quiz = await client
        .collection("quiz")
        .update(id, { isMatchStarted: false }, { $autoCancel: false });
      set({ quiz: updatedQuiz });
      toast.success("Conteo regresivo detenido!", toastOptions);
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      toast.error(
        "Hubo un error al detener el conteo regresivo!",
        toastOptions
      );
      console.log(parsedError);
    } finally {
      set({ isLoading: false });
    }
  },

  giveNewAttempt: async (id: string, isNewAttempt: boolean) => {
    /*La ejecuta el admin para dar una nueva oportunidad al player si este contesto mal */
    try {
      const updatedQuiz: Quiz = await client
        .collection("quiz")
        .update(id, { isNewAttempt }, { $autoCancel: false });
      set({ quiz: updatedQuiz });
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      console.log(parsedError);
    }
  },
  setConsolationAward: async (id: string, award: ConsolationAwardFormData) => {
    try {
      const updatedQuiz: Quiz = await client
        .collection("quiz")
        .update(
          id,
          { consolationAward: award.consolationAward },
          { $autoCancel: false }
        );
      set({ quiz: updatedQuiz });
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      console.log(parsedError);
    }
  },
  setCurrentQuestion: async (id: string, currentQuestion: Question) => {
    set({ isLoading: true });
    try {
      const updatedQuiz: Quiz = await client
        .collection("quiz")
        .update(id, { currentQuestion }, { $autoCancel: false });
      set({ quiz: updatedQuiz });
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      console.log(parsedError);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useQuizGameStore;
