import { AddCategoryFormData, WrongInput } from "@models/FormDataModel";

export const initialValues: AddCategoryFormData = {
  name: "",
};

export const initialErrors: WrongInput = {
  name: {
    message: "",
    error: false,
  },
};
