import {
  AddAnswerFormData,
  AddQuestionFormData,
  StartFormData,
  AddCategoryFormData,
  ConsolationAwardFormData,
} from "@models/FormDataModel";

export const startFormInitialValues: StartFormData = {
  username: "",
};

export const addQuestionFormInitialValues: AddQuestionFormData = {
  name: "",
  questionBody: "",
  answers: [],
  time: 0,
  reward: 0,
  category: "",
  difficulty: "Basico",
};

export const addAnswerFormInitialValues: AddAnswerFormData = {
  answerText: "",
  isCorrectAnswer: false,
};

export const addCategoryFormInitialValues: AddCategoryFormData = {
  name: "",
};

export const consolationAwardFormInitialValues: ConsolationAwardFormData = {
  consolationAward: 0,
};
