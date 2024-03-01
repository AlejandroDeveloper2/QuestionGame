import { Answer } from "@models/DataModels";
import { FieldErrorType } from "@models/FormDataModel";

const markWrongInput = (
  formRef: React.RefObject<HTMLFormElement>,
  inputKey: string,
  error: boolean
): void => {
  const $fieldset = formRef.current?.querySelector("fieldset");
  const $input = $fieldset?.querySelector(`#${inputKey}`);
  if (error) $input?.setAttribute("style", "border-color: var(--red)");
  else $input?.setAttribute("style", "border-color: var(--primary-color-base)");
};

export class Validations {
  constructor() {}

  public validateEmptyFields(
    field: string | number,
    key: string,
    formRef: React.RefObject<HTMLFormElement>
  ): Promise<FieldErrorType> {
    let error: FieldErrorType;
    if (field === "") {
      error = {
        message: "El campo es obligatorio!",
        error: true,
      };
      markWrongInput(formRef, key, true);
      return Promise.reject(error);
    } else {
      error = {
        message: "",
        error: false,
      };
      markWrongInput(formRef, key, false);
      return Promise.resolve(error);
    }
  }

  public validateNumericFields(
    field: number,
    key: string,
    formRef: React.RefObject<HTMLFormElement>
  ): Promise<FieldErrorType> {
    let error: FieldErrorType;
    const isNumberExp = /^[0-9]+$/;

    if (field < 0) {
      error = {
        message: "El número ingresado no puede ser negativo!",
        error: true,
      };
      markWrongInput(formRef, key, true);
      return Promise.reject(error);
    } else if (!isNumberExp.test(String(field))) {
      error = {
        message: "El valor ingresado debe ser un número!",
        error: true,
      };
      markWrongInput(formRef, key, true);
      return Promise.reject(error);
    } else {
      error = {
        message: "",
        error: false,
      };
      markWrongInput(formRef, key, false);
      return Promise.resolve(error);
    }
  }

  public validateUsername(
    field: string,
    key: string,
    formRef: React.RefObject<HTMLFormElement>
  ): Promise<FieldErrorType> {
    let error: FieldErrorType;
    if (field.length < 3) {
      error = {
        message: "El nombre de usuario debe tener de al menos 3 caracteres!",
        error: true,
      };
      markWrongInput(formRef, key, true);
      return Promise.reject(error);
    } else {
      error = {
        message: "",
        error: false,
      };
      markWrongInput(formRef, key, false);
      return Promise.resolve(error);
    }
  }

  public validateListInputOptions<Answer>(
    answerOptions: Answer[],
    key: string,
    formRef: React.RefObject<HTMLFormElement>
  ): Promise<FieldErrorType> {
    let error: FieldErrorType;
    if (answerOptions.length === 0 || answerOptions.length < 4) {
      error = {
        message: "Añade solo 4 opciones!",
        error: true,
      };
      markWrongInput(formRef, key, true);
      return Promise.reject(error);
    } else {
      error = {
        message: "",
        error: false,
      };
      markWrongInput(formRef, key, false);
      return Promise.resolve(error);
    }
  }

  public validateAnswerOptions(
    answers: Answer[],
    key: string,
    formRef: React.RefObject<HTMLFormElement>
  ): Promise<FieldErrorType> {
    let error: FieldErrorType;
    const correctAnswers = answers.filter(
      (answer: { isCorrectAnswer: boolean }) => answer.isCorrectAnswer === true
    );
    if (correctAnswers.length === 1) {
      error = {
        message: "",
        error: false,
      };
      markWrongInput(formRef, key, false);
      return Promise.resolve(error);
    } else {
      error = {
        message: "Debe haber solo una respuesta correcta!",
        error: true,
      };
      markWrongInput(formRef, key, true);
      return Promise.reject(error);
    }
  }
}
