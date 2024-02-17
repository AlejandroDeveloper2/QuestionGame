import { AxiosError } from "axios";

import axiosClient from "@config/axiosClient";
import { Quiz, ServerResponse } from "@models/DataModels";

const getQuiz = async (): Promise<Quiz> => {
  let response: Quiz = {
    id: "",
    questions: [],
    isMatchStarted: false,
    isNewAttempt: false,
    isQuizStarted: false,
    isGameCompleted: false,
    matchResult: "EnEspera",
    isQuizFinished: false,
    consolationAward: 0,
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
    isGameRestarted: false,
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const { data } = await axiosClient.get(
      "api/collections/quiz/records",
      config
    );
    response = data.items[0];
  } catch (_e: unknown) {
    const errorMessage = (_e as AxiosError<ServerResponse>).response?.data
      .message;
    throw new Error(errorMessage);
  }
  return response;
};

export { getQuiz };
