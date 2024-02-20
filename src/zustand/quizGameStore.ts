import { create } from "zustand";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";

import { QuizGameStore } from "@models/StoreModels";
import { MatchResult, Quiz, ServerResponse } from "@models/DataModels";

import { client } from "@config/pocketbase";
import toastOptions from "@constants/toastOptions";
import { ConsolationAwardFormData } from "@models/FormDataModel";

const useQuizGameStore = create<QuizGameStore>((set) => ({
  isLoading: false,
  quiz: {
    id: "",
    playerName: "",
    questions: [],
    matchResult: "EnEspera",
    consolationAward: "",
    isQuizStarted: false,
    isQuizFinished: false,
    isMatchStarted: false,
    isGameCompleted: false,
    isNewAttempt: false,
  },
  setQuiz: (quiz: Quiz) => {
    set({ quiz });
  },
  setPlayerName: async (playerName: string) => {
    try {
      const updatedQuiz: Quiz = await client
        .collection("quiz")
        .update(
          import.meta.env.VITE_QUIZ_ID_PRODUCTION,
          { playerName },
          { $autoCancel: false }
        );
      set({ quiz: updatedQuiz });
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      console.log(parsedError);
    }
  },
  startQuiz: async (id: string, questionsLength: number) => {
    /*La ejecuta el Admin */
    if (questionsLength >= 60) {
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
          consolationAward: "",
          playerName: "",
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
    set({ isLoading: true });
    try {
      const updatedQuiz: Quiz = await client
        .collection("quiz")
        .update(
          id,
          { consolationAward: award.consolationAward },
          { $autoCancel: false }
        );
      set({ quiz: updatedQuiz });
      toast.success("Premio seguro asignado con exito!", toastOptions);
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      toast.error(
        "Ha ocurrido un error al asignar el premio seguro!",
        toastOptions
      );
      console.log(parsedError);
    } finally {
      set({ isLoading: false });
    }
  },

  restartQuiz: async (id: string) => {
    set({ isLoading: true });
    try {
      const updatedQuiz: Quiz = await client.collection("quiz").update(
        id,
        {
          isGameCompleted: false,
          matchResult: "EnEspera",
          consolationAward: "",
        },
        { $autoCancel: false }
      );
      set({ quiz: updatedQuiz });
      toast.success("Quiz reiniciado con exito!", toastOptions);
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;

      toast.error("Ha ocurrido un error al reiniciar el quiz!", toastOptions);
      console.log(parsedError);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useQuizGameStore;
