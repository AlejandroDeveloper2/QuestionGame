import useCategoryStore from "@zustand/categoryStore";
import useQuestionStore from "@zustand/questionStore";

const useCardActions = (type: "question" | "category", itemId: string) => {
  const removeQuestion = useQuestionStore((state) => state.removeQuestion);
  const removeCategory = useCategoryStore((state) => state.removeCategory);

  const deleteItem = (): void => {
    if (type === "question") removeQuestion(itemId);
    else removeCategory(itemId);
  };

  return {
    deleteItem,
  };
};
export default useCardActions;
