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
  isloading: string;
}

interface LinkStyleProps {
  color: string;
}

interface ModalStyleProps {
  ismodalvisible: string;
}

interface BadgeStyleProps {
  backgroundcolor: string;
  color: string;
  padding?: string;
  fontsize?: string;
}

type FlexDirection = "row" | "column";

interface HeaderStyleProps {
  height: Size;
  direction: { sm: FlexDirection; md: FlexDirection; lg: FlexDirection };
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
