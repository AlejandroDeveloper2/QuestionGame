/* eslint-disable react-hooks/exhaustive-deps */
import useQuizMatchStore from "@zustand/quizMatchStore";
import { useEffect } from "react";

const useFloatPopUp = () => {
  const { match, resetDividedWildCard } = useQuizMatchStore();

  const resetDivided = async () => {
    await resetDividedWildCard();
  };

  useEffect(() => {
    if (match.selectedAnswers >= 2) {
      resetDivided();
    }
  }, [match.isDividedWildCard, match.selectedAnswers]);
};
export default useFloatPopUp;
