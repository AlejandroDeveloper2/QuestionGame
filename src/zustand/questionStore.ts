import { create } from "zustand";
import { toast } from "react-toastify";

import { client } from "@config/pocketbase";

import { QuestionStore } from "@models/StoreModels";
import { AddQuestionFormData } from "@models/FormDataModel";
import { Question, ServerResponse } from "@models/DataModels";
import toastOptions from "@constants/toastOptions";

const useQuestionStore = create<QuestionStore>((set) => ({
  isLoading: false,
  questions: [],
  updateQuizQuestions: async (questions: Question[]) => {
    const quizId = import.meta.env.VITE_QUIZ_ID_PRODUCTION;
    try {
      await client
        .collection("quiz")
        .update(quizId, { questions }, { $autoCancel: false });
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      console.log(parsedError);
    }
  },
  getAllQuestions: async () => {
    set({ isLoading: true });
    try {
      const questions: Question[] = await client
        .collection("questions")
        .getFullList({ $autoCancel: false });
      set({ questions });
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      console.log(parsedError);
    } finally {
      setTimeout(() => {
        set({ isLoading: false });
      }, 1000);
    }
  },
  addQuestion: async (question: AddQuestionFormData) => {
    try {
      const savedQuestion: Question = await client
        .collection("questions")
        .create(question, { $autoCancel: false });
      set(({ questions }) => ({ questions: [...questions, savedQuestion] }));
      toast.success("Pregunta agregada con exito!", toastOptions);
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      console.log(parsedError);
      toast.error("Ha ocurrido un error al guardar la pregunta!", toastOptions);
    }
  },
  removeQuestion: async (id: string) => {
    try {
      await client.collection("questions").delete(id);
      set(({ questions }) => ({
        questions: questions.filter((question) => question.id !== id),
      }));
      toast.success("Pregunta eliminada con exito!", toastOptions);
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      console.log(parsedError);
      toast.error(
        "Ha ocurrido un error al eliminar la pregunta!",
        toastOptions
      );
    }
  },
  editQuestion: async (id: string, modifiedQuestion: AddQuestionFormData) => {
    try {
      const updatedQuestion: Question = await client
        .collection("questions")
        .update(id, modifiedQuestion, { $autoCancel: false });
      set(({ questions }) => ({
        questions: questions.map((question) => {
          if (question.id === id) return updatedQuestion;
          return question;
        }),
      }));
      toast.success("Pregunta editada con exito!", toastOptions);
    } catch (_e: unknown) {
      const parsedError = _e as ServerResponse;
      toast.error("Ha ocurrido un error al editar la pregunta!", toastOptions);
      console.log(parsedError);
    }
  },
}));

export default useQuestionStore;
