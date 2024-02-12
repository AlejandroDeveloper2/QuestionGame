import { useState } from "react";

const useAnswerForm = () => {
  const [isAddAnswerFormOpen, setIsAddAnswerFormOpen] =
    useState<boolean>(false);

  const toggleForm = (): void => {
    setIsAddAnswerFormOpen(!isAddAnswerFormOpen);
  };

  return {
    isAddAnswerFormOpen,
    toggleForm,
  };
};
export default useAnswerForm;
