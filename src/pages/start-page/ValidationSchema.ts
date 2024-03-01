import {
  StartFormData,
  FieldErrorType,
  WrongInput,
} from "@models/FormDataModel";

import { Validations } from "@utils/Validations";

const validations = new Validations();

export const validationSchema = async (
  formData: StartFormData,
  formRef: React.RefObject<HTMLFormElement>
): Promise<WrongInput> => ({
  username: await validations
    .validateEmptyFields(formData.username, "username", formRef)
    .then(() =>
      validations.validateUsername(formData.username, "username", formRef)
    )
    .catch((error: FieldErrorType) => error),
});
