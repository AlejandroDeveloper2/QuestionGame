import { AddAnswerFormData, WrongInput } from "@models/FormDataModel";

export const initialValues: AddAnswerFormData = {
  answerText: "",
  isCorrectAnswer: false,
};

export const initialErrors: WrongInput = {
  answerText: {
    message: "",
    error: false,
  },
  isCorrectAnswer: {
    message: "",
    error: false,
  },
};
