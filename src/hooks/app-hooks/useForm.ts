import { useState, useRef, useEffect } from "react";

import { Error, ValidationType } from "@models/DataModels";
import {
  markErrorInput,
  resetInputStyles,
  validateEmptyFields,
  validateListInputOptions,
} from "@utils/formValidations";
import { useListInputControl, useMultiOptionInput } from "..";

const useForm = <T>(
  initialData: T,
  validations: ((
    data: T,
    addError: (error: Error) => void
  ) => ValidationType[])[],
  action: () => void
) => {
  const [data, setData] = useState<T>(initialData);
  const [errors, setErrors] = useState<Error[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const addError = (error: Error): void => {
    setErrors([error, ...errors]);
  };

  const clearForm = (): void => {
    setData(initialData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let wrongFields = validateEmptyFields(data, addError);
    let formValidations: ValidationType[][] = [wrongFields];
    let newFormValidations: ValidationType[] = [];

    if (wrongFields.every((field) => field.error === false)) {
      validations.forEach((validation) => {
        wrongFields = validation(data, addError);
        formValidations.push(wrongFields);
      });
    }
    newFormValidations = formValidations.flat();
    if (
      newFormValidations.every((field) => field.error === false) &&
      newFormValidations.length !== 0
    ) {
      formValidations = [];
      newFormValidations = [];
      resetInputStyles(formRef);
      setErrors([]);
      action();
      clearForm();
      return;
    }
    markErrorInput(formRef, newFormValidations);
  };

  return {
    formRef,
    errors,
    data,
    handleChange,
    handleSubmit,
  };
};

export const useComposedForm = <T, S>(
  initialData: T,
  validations: ((
    data: T,
    addError: (error: Error) => void
  ) => ValidationType[])[],
  action: () => void,
  multiOptionInputConfig: { options: S[]; inputKey: string; defaultOption: S }
) => {
  const [data, setData] = useState<T>(initialData);
  const [errors, setErrors] = useState<Error[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const { activeOption, markOption } = useMultiOptionInput<S>(
    multiOptionInputConfig.options,
    multiOptionInputConfig.defaultOption
  );

  const updateData = (): void => {
    setData((prevData) => {
      const newData = Object({ ...prevData });
      newData[multiOptionInputConfig.inputKey] = activeOption;
      return newData;
    });
  };

  useEffect(() => {
    updateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeOption]);

  const addError = (error: Error): void => {
    setErrors([error, ...errors]);
  };

  const clearForm = (): void => {
    setData(initialData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let wrongFields = validateEmptyFields(data, addError);

    let formValidations: ValidationType[][] = [wrongFields];
    let newFormValidations: ValidationType[] = [];

    if (wrongFields.every((field) => field.error === false)) {
      validations.forEach((validation) => {
        wrongFields = validation(data, addError);
        formValidations.push(wrongFields);
      });
    }
    newFormValidations = formValidations.flat();
    if (newFormValidations.every((field) => field.error === false)) {
      formValidations = [];
      newFormValidations = [];
      resetInputStyles(formRef);
      setErrors([]);
      action();
      clearForm();
      return;
    }
    markErrorInput(formRef, newFormValidations);
  };

  return {
    formRef,
    errors,
    data,
    handleChange,
    handleSubmit,
    markOption,
  };
};

export const useSpecialForm = <T, S, X>(
  initialData: T,
  validations: ((
    data: T,
    addError: (error: Error) => void
  ) => ValidationType[])[],
  action: () => void,
  listInputControlConfig: { options: S[]; inputKey: string },
  multiOptionInputConfig: { options: X[]; inputKey: string; defaultOption: X },
  mode: "edit" | "add"
) => {
  const { options, inputKey } = listInputControlConfig;

  const [data, setData] = useState<T>(initialData);
  const [errors, setErrors] = useState<Error[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const { optionList, addOption, removeOption, clearOptionList } =
    useListInputControl<S>(options);
  const { activeOption, markOption } = useMultiOptionInput<X>(
    multiOptionInputConfig.options,
    multiOptionInputConfig.defaultOption
  );

  const updateData = (): void => {
    setData((prevData) => {
      const newData = Object({ ...prevData });
      newData[inputKey] = optionList;
      newData[multiOptionInputConfig.inputKey] = activeOption;
      return newData;
    });
  };

  useEffect(() => {
    updateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionList, activeOption]);

  const addError = (error: Error): void => {
    setErrors([error, ...errors]);
  };

  const clearForm = (): void => {
    setData(initialData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let wrongFields = validateEmptyFields(data, addError);
    const wrongFields2 = validateListInputOptions(data, addError);

    let formValidations: ValidationType[][] = [wrongFields, wrongFields2];
    let newFormValidations: ValidationType[] = [];

    if (
      wrongFields.concat(wrongFields2).every((field) => field.error === false)
    ) {
      validations.forEach((validation) => {
        wrongFields = validation(data, addError);
        formValidations.push(wrongFields);
      });
    }
    newFormValidations = formValidations.flat();
    if (newFormValidations.every((field) => field.error === false)) {
      formValidations = [];
      newFormValidations = [];
      if (mode === "add") clearOptionList();
      resetInputStyles(formRef);
      setErrors([]);
      action();
      clearForm();
      return;
    }
    markErrorInput(formRef, newFormValidations);
  };

  return {
    formRef,
    errors,
    data,
    handleChange,
    handleSubmit,
    addOption,
    removeOption,
    markOption,
  };
};

export default useForm;
