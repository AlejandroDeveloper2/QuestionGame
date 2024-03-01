import {
  AddCategoryFormData,
  FieldErrorType,
  WrongInput,
} from "@models/FormDataModel";

import { Validations } from "@utils/Validations";

const validations = new Validations();

export const validationSchema = async (
  formData: AddCategoryFormData,
  formRef: React.RefObject<HTMLFormElement>
): Promise<WrongInput> => ({
  name: await validations
    .validateEmptyFields(formData.name, "name", formRef)
    .then((wrongInput) => wrongInput)
    .catch((error: FieldErrorType) => error),
});
