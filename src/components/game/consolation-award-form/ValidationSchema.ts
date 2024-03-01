import {
  ConsolationAwardFormData,
  FieldErrorType,
  WrongInput,
} from "@models/FormDataModel";

import { Validations } from "@utils/Validations";

const validations = new Validations();

export const validationSchema = async (
  formData: ConsolationAwardFormData,
  formRef: React.RefObject<HTMLFormElement>
): Promise<WrongInput> => ({
  consolationAward: await validations
    .validateEmptyFields(formData.consolationAward, "consolationAward", formRef)
    .then(() =>
      validations.validateNumericFields(
        formData.consolationAward,
        "consolationAward",
        formRef
      )
    )
    .catch((error: FieldErrorType) => error),
});
