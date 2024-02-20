import { ValidationType, Error } from "@models/DataModels";

export const markErrorInput = (
  formRef: React.RefObject<HTMLFormElement>,
  formValidations: ValidationType[]
) => {
  const $inputContainer = formRef.current?.querySelector("fieldset");
  formValidations.forEach((validation) => {
    const $input: HTMLElement | null | undefined =
      $inputContainer?.querySelector(`#${validation.fieldkey}`);
    if (validation.error)
      if (
        validation.fieldkey === "answers" ||
        validation.fieldkey === "difficulty"
      )
        $input
          ?.querySelector("label")
          ?.setAttribute("style", "color:var(--red)");
      else $input?.setAttribute("style", "border:4px var(--red) solid");
    else if (
      validation.fieldkey === "answers" ||
      validation.fieldkey === "difficulty"
    )
      $input
        ?.querySelector("label")
        ?.setAttribute("style", "color:var(--primary-color-base)");
    else
      $input?.setAttribute(
        "style",
        "border:4px var(--primary-color-base) solid"
      );
  });
};

export const resetInputStyles = (
  formRef: React.RefObject<HTMLFormElement>
): void => {
  const $inputContainer = formRef.current?.querySelector("fieldset");
  const $inputs = $inputContainer?.querySelectorAll("kbd");

  $inputs?.forEach(($input) => {
    $input?.setAttribute("style", "border:4px var(--primary-color-base) solid");
  });
};

export const validateEmptyFields = <T>(
  data: T,
  addError: (error: Error) => void
): ValidationType[] => {
  const wrongFields: ValidationType[] = [];
  const parsedData = Object(data);

  for (const key in parsedData) {
    if (Object.prototype.hasOwnProperty.call(parsedData, key)) {
      const element = parsedData[key];
      if (typeof element === "string") {
        if (element === "") {
          wrongFields.push({ fieldkey: key, error: true });
          addError({ message: "Todos los campos son requeridos!" });
        } else wrongFields.push({ fieldkey: key, error: false });
      } else if (typeof element === "number") {
        if (element === null) {
          wrongFields.push({ fieldkey: key, error: true });
          addError({ message: "Todos los campos son requeridos!" });
        } else if (element < 0) {
          wrongFields.push({ fieldkey: key, error: true });
          addError({ message: "No se aceptan cantidades negativas!" });
        } else {
          wrongFields.push({ fieldkey: key, error: false });
        }
      }
    }
  }
  return wrongFields;
};

export const validateListInputOptions = <T>(
  data: T,
  addError: (error: Error) => void
): ValidationType[] => {
  const wrongFields: ValidationType[] = [];
  const parsedData = Object(data);

  for (const key in parsedData) {
    if (Object.prototype.hasOwnProperty.call(parsedData, key)) {
      const element = parsedData[key];
      if (key === "answers") {
        if (element.length === 0 || element.length < 4) {
          wrongFields.push({ fieldkey: key, error: true });
          addError({ message: "Añade minimo 4 opciones" });
        } else wrongFields.push({ fieldkey: key, error: false });
      }
    }
  }
  return wrongFields;
};

export const validateAnswerOptions = <T>(
  data: T,
  addError: (error: Error) => void
): ValidationType[] => {
  let wrongFields: ValidationType[] = [];
  const parsedData = Object(data);
  let answers = [];

  for (const key in parsedData) {
    const element = parsedData[key];
    if (key === "answers") {
      answers = element;
      break;
    }
  }
  const correctAnswers = answers.filter(
    (answer: { isCorrectAnswer: boolean }) => answer.isCorrectAnswer === true
  );
  if (correctAnswers.length === 1) {
    wrongFields = [];
    wrongFields.push({ fieldkey: "answers", error: false });
  } else {
    console.log(wrongFields);
    wrongFields.push({ fieldkey: "answers", error: true });
    addError({ message: "Debe haber solo una respuesta correcta!" });
  }

  return wrongFields;
};

export const validateUsername = <T>(
  data: T,
  addError: (error: Error) => void
): ValidationType[] => {
  const wrongFields: ValidationType[] = [];
  const parsedData = Object(data);

  for (const key in parsedData) {
    if (Object.prototype.hasOwnProperty.call(parsedData, key)) {
      const element = parsedData[key];
      if (key === "username") {
        if (element.length < 3) {
          wrongFields.push({ fieldkey: key, error: true });
          addError({
            message:
              "El nombre de usuario debe tener de al menos 3 caracteres!",
          });
        } else wrongFields.push({ fieldkey: key, error: false });
      }
    }
  }
  return wrongFields;
};
