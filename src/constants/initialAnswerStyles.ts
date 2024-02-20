import { AnswerOptionStyleProps } from "@models/StylePropsModels";

export const initialAnswerStyle: AnswerOptionStyleProps[] = Array(4).fill({
  background: "var(--primary-color-100)",
  color: "var(--gray)",
  bordercolor: "var(--primary-color-300)",
  opacity: 1,
});
