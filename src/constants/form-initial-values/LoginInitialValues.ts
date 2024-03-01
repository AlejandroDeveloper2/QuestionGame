import { LoginFormData, WrongInput } from "@models/FormDataModel";

export const initialValues: LoginFormData = {
  username: "",
  password: "",
};

export const initialErrors: WrongInput = {
  username: {
    message: "",
    error: false,
  },
  password: {
    message: "",
    error: false,
  },
};
