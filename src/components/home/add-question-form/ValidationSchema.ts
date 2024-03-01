import {
  AddQuestionFormData,
  FieldErrorType,
  WrongInput,
} from "@models/FormDataModel";

import { Validations } from "@utils/Validations";

const validations = new Validations();

export const validationSchema = async (
  formData: AddQuestionFormData,
  formRef: React.RefObject<HTMLFormElement>
): Promise<WrongInput> => ({
  name: await validations
    .validateEmptyFields(formData.name, "name", formRef)
    .then((wrongInput) => wrongInput)
    .catch((error: FieldErrorType) => error),
  questionBody: await validations
    .validateEmptyFields(formData.questionBody, "questionBody", formRef)
    .then((wrongInput) => wrongInput)
    .catch((error: FieldErrorType) => error),
  answers: await validations
    .validateListInputOptions(formData.answers, "answers", formRef)
    .then((wrongInput) => wrongInput)
    .catch((error: FieldErrorType) => error),
  time: await validations
    .validateEmptyFields(formData.time, "time", formRef)
    .then(() =>
      validations.validateNumericFields(formData.time, "time", formRef)
    )
    .catch((error: FieldErrorType) => error),
  reward: await validations
    .validateEmptyFields(formData.reward, "reward", formRef)
    .then(() =>
      validations.validateNumericFields(formData.reward, "reward", formRef)
    )
    .catch((error: FieldErrorType) => error),
  category: await validations
    .validateEmptyFields(formData.category, "category", formRef)
    .then((wrongInput) => wrongInput)
    .catch((error: FieldErrorType) => error),
  difficulty: await validations
    .validateEmptyFields(formData.difficulty, "difficulty", formRef)
    .then((wrongInput) => wrongInput)
    .catch((error: FieldErrorType) => error),
});
