/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import useCategoryStore from "@zustand/categoryStore";
import useQuestionStore from "@zustand/questionStore";

const useLoadRecords = () => {
  const getAllCategories = useCategoryStore((state) => state.getAllCategories);
  const { questions, getAllQuestions, updateQuizQuestions } =
    useQuestionStore();

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    getAllQuestions();
  }, []);

  useEffect(() => {
    updateQuizQuestions(questions);
  }, [questions]);
};
export default useLoadRecords;
