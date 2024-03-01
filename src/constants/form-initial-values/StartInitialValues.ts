import { StartFormData, WrongInput } from "@models/FormDataModel";

export const initialValues: StartFormData = {
  username: "",
};

export const initialErrors: WrongInput = {
  username: {
    message: "",
    error: false,
  },
};
