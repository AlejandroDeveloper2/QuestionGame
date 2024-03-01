import {
  AddAnswerFormData,
  FieldErrorType,
  WrongInput,
} from "@models/FormDataModel";

import { Validations } from "@utils/Validations";

const validations = new Validations();

export const validationSchema = async (
  formData: AddAnswerFormData,
  formRef: React.RefObject<HTMLFormElement>
): Promise<WrongInput> => ({
  answerText: await validations
    .validateEmptyFields(formData.answerText, "answerText", formRef)
    .then((wrongInput) => wrongInput)
    .catch((error: FieldErrorType) => error),
  isCorrectAnswer: await validations
    .validateEmptyFields(
      String(formData.isCorrectAnswer),
      "isCorrectAnswer",
      formRef
    )
    .then((wrongInput) => wrongInput)
    .catch((error: FieldErrorType) => error),
});
