import { ConsolationAwardFormData, WrongInput } from "@models/FormDataModel";

export const initialValues: ConsolationAwardFormData = {
  consolationAward: 0,
};

export const initialErrors: WrongInput = {
  consolationAward: {
    message: "",
    error: false,
  },
};
