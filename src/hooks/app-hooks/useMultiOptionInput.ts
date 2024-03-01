import { useState, useEffect } from "react";

const useMultiOptionInput = <T>(
  options: T[],
  defaultOption: T,
  key: string,
  updateFormData: <T>(fieldValue: T, key: string) => void
) => {
  const [activeOption, setActiveOption] = useState<T>(defaultOption);
  const [optionList] = useState<T[]>(options);

  useEffect(() => {
    updateFormData<T>(activeOption, key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeOption]);

  const markOption = (selectedOption: T) => {
    optionList.forEach((option) => {
      if (option === selectedOption) {
        setActiveOption(option);
      }
    });
  };

  return {
    inputOptions: optionList,
    activeOption,
    markOption,
  };
};

export default useMultiOptionInput;
