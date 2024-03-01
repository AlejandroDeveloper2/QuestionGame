import { useState, useEffect } from "react";

const useListInputControl = <T>(
  options: T[],
  key: string,
  updateFormData: <T>(fieldValue: T, key: string) => void
) => {
  const [optionList, setOptionList] = useState<T[]>(options);

  useEffect(() => {
    updateFormData<T[]>(optionList, key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionList]);

  const addOption = (option: T): void => {
    setOptionList([...optionList, option]);
  };

  const removeOption = (id: number): void => {
    const filteredOptions = optionList.filter((_, i) => i !== id);
    setOptionList(filteredOptions);
  };

  const clearOptionList = (): void => {
    setOptionList([]);
  };

  return {
    optionList,
    addOption,
    removeOption,
    clearOptionList,
  };
};
export default useListInputControl;
