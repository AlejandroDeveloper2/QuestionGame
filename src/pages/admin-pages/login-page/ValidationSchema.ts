import {
  LoginFormData,
  FieldErrorType,
  WrongInput,
} from "@models/FormDataModel";

import { Validations } from "@utils/Validations";

const validations = new Validations();

export const validationSchema = async (
  formData: LoginFormData,
  formRef: React.RefObject<HTMLFormElement>
): Promise<WrongInput> => ({
  username: await validations
    .validateEmptyFields(formData.username, "username", formRef)
    .then(() =>
      validations.validateUsername(formData.username, "username", formRef)
    )
    .catch((error: FieldErrorType) => error),
  password: await validations
    .validateEmptyFields(formData.password, "password", formRef)
    .then((wrongInput) => wrongInput)
    .catch((error: FieldErrorType) => error),
});
