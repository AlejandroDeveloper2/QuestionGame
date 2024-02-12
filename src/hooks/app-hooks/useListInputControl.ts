import { useState } from "react";

const useListInputControl = <S>(options: S[]) => {
  const [optionList, setOptionList] = useState<S[]>(options);

  const addOption = (option: S): void => {
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
