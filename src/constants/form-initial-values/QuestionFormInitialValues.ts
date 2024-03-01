import { AddQuestionFormData, WrongInput } from "@models/FormDataModel";

export const initialValues: AddQuestionFormData = {
  name: "",
  questionBody: "",
  answers: [],
  time: 0,
  reward: 0,
  category: "",
  difficulty: "Basico",
};

export const initialErrors: WrongInput = {
  name: {
    message: "",
    error: false,
  },
  questionBody: {
    message: "",
    error: false,
  },
  answers: {
    message: "",
    error: false,
  },
  time: {
    message: "",
    error: false,
  },
  reward: {
    message: "",
    error: false,
  },
  category: {
    message: "",
    error: false,
  },
  difficulty: {
    message: "",
    error: false,
  },
};
