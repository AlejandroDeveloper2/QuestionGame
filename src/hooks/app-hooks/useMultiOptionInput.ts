import { useState } from "react";

const useMultiOptionInput = <T>(options: T[], defaultOption: T) => {
  const [activeOption, setActiveOption] = useState<T>(defaultOption);
  const [optionList] = useState<T[]>(options);

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
