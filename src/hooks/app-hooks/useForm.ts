import { useState, useRef } from "react";

import { WrongInput } from "@models/FormDataModel";

const useForm = <T>(
  initialValues: T,
  initialErrors: WrongInput,
  validationSchema: (
    formData: T,
    formRef: React.RefObject<HTMLFormElement>
  ) => Promise<WrongInput>,
  action: () => void
) => {
  const [data, setData] = useState<T>(initialValues);
  const [errors, setErrors] = useState<WrongInput>(initialErrors);
  const formRef = useRef<HTMLFormElement>(null);

  const updateErrors = (updatedErrors: WrongInput): void => {
    setErrors(updatedErrors);
  };

  const updateFormData = <S>(fieldValue: S, key: string): void => {
    setData({ ...data, [key]: fieldValue });
  };

  const clearForm = (): void => {
    setData(initialValues);
    setErrors(initialErrors);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const wrongInput = await validationSchema(data, formRef);
    updateErrors(wrongInput);

    if (Object.values(wrongInput).every((error) => !error.error)) {
      action();
      clearForm();
      return;
    }
  };

  return {
    formRef,
    errors,
    data,
    updateFormData,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
