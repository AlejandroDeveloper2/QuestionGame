import { Size } from "./ComponentPropsModels";

type FieldSetStyleProps = {
  width: Size;
};

type ButtonStyleType = {
  background: string;
  color: string;
  width: Size;
  height: Size;
};

interface LoadStyleProps {
  load: number;
}

interface LoadingWindowStyleProps {
  opacity: number;
  isLoading: string;
}

interface LinkStyleProps {
  color: string;
}

interface ModalStyleProps {
  isModalVisible: string;
}

interface BadgeStyleProps {
  backgroundColor: string;
  color: string;
}

type FlexDirection = "row" | "column";

interface HeaderStyleProps {
  height: Size;
  flexDirection: { sm: FlexDirection; md: FlexDirection; lg: FlexDirection };
}

interface AnswerOptionStyleProps {
  background: string;
  bordercolor: string;
  color: string;
  opacity: number;
}

interface DividedWildCardStyleProps {
  positionx: number;
}

export type {
  LoadStyleProps,
  LoadingWindowStyleProps,
  CustomFormStyle,
  ButtonStyleType,
  FieldSetStyleProps,
  LinkStyleProps,
  ModalStyleProps,
  BadgeStyleProps,
  HeaderStyleProps,
  AnswerOptionStyleProps,
  DividedWildCardStyleProps,
};
