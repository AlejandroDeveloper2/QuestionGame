/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

const useFloatPopUp = (
  selectedQuestions: number,
  isDividedWildCard: boolean
) => {
  const [isPopUpVisible, setIsPopUpVisible] = useState<boolean>(false);

  const togglePopUp = (): void => {
    setIsPopUpVisible(!isPopUpVisible);
  };

  useEffect(() => {
    if (selectedQuestions >= 2 || !isDividedWildCard) {
      setIsPopUpVisible(false);
    }
  }, [selectedQuestions, isDividedWildCard]);

  return {
    isPopUpVisible,
    togglePopUp,
  };
};
export default useFloatPopUp;
