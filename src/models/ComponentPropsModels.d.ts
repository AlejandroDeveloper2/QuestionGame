import { IconType } from "react-icons";
import { ReactNode } from "react";

import {
  ButtonStyleType,
  FieldSetStyleProps,
  BadgeStyleProps,
  HeaderStyleProps,
} from "./StylePropsModels";
import { Difficulty, Answer, AnswerMark } from "./DataModels";
import { AddQuestionFormData } from "./FormDataModel";

export type Size = { sm: number; md: number; lg: number };

export type InputType =
  | "text"
  | "number"
  | "date"
  | "password"
  | "email"
  | "phone"
  | "time";

interface LogoProps {
  width: Size;
  height: Size;
}

interface LoadingWindowProps {
  children: React.ReactNode | React.ReactNode[];
  opacity: number;
  isLoading: boolean;
}

interface SpinnerProps {
  message?: string;
  color?: string;
}

interface LoaderProps {
  load: number;
}

interface CustomFormProps {
  children: React.ReactNode | React.ReactNode[];
  formRef: React.RefObject<HTMLFormElement>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

interface FieldSetProps {
  children: React.ReactNode | React.ReactNode[];
  fieldSetStyle: FieldSetStyleProps;
}

interface BaseInputProps {
  label: string;
  name: string;
  Icon: IconType;
  errorMessage: string;
  children?: ReactNode | ReactNode[];
}

interface InputProps extends BaseInputProps {
  type: InputType;
  placeholder: string;
  value: string | number;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface SelectProps extends BaseInputProps {
  options: T[];
  value: string;
  inputKey: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

interface BaseButtonProps {
  children?: React.ReactNode | React.ReactNode[];
  style: ButtonStyleType;
  title: string;
  type?: "submit" | "button";
  disabled?: boolean;
  onClick: () => void;
}

interface ButtonWithLabelProps extends BaseButtonProps {
  label: string;
}

interface ButtonWithIconProps extends ButtonWithLabelProps {
  Icon: IconType;
}

interface ButtonIconOnlyProps extends BaseButtonProps {
  Icon: IconType;
}

interface ErrorMessageProps {
  message: string;
}

interface HeaderProps {
  style: HeaderStyleProps;
  children: ReactNode | ReactNode[];
}

interface NavigationProps {
  addingFunction: () => void;
}

interface CardListProps {
  children: ReactNode | ReactNode[];
}

interface CardProps {
  title: string;
  Icon: IconType;
  id: string;
  data: T;
  type: "category" | "question";
  children?: ReactNode | ReactNode[];
}
interface CardItemProps {
  Icon: IconType;
  itemTitle: string;
  itemValue: string | number | Difficulty;
}

interface ModalProps {
  children: ReactNode | ReactNode[];
  modalTitle?: string;
  hasCloseButton?: boolean;
  isModalVisible: boolean;
  closeModal: () => void;
}

interface AddQuestionFormProps {
  id?: string;
  isAddAnswerFormOpen: boolean;
  mode: "add" | "edit";
  initialValues: AddQuestionFormData;
  closeModal: () => void;
  toggleForm: () => void;
}

interface AddCategoryFormProps {
  id?: string;
  mode: "add" | "edit";
  initialValues: AddCategoryFormData;
  closeModal: () => void;
}

interface ListInputControlProps {
  label: string;
  options: T[];
  name: string;
  errorMessage: string;
  toggleForm: () => void;
  removeOption: (id: number) => void;
}

interface AddAnswerFormProps {
  addOption: (option: T) => void;
  toggleForm: () => void;
}

interface MultiOptionInputProps {
  icons: IconType[];
  label: string;
  options: T[];
  name: string;
  selectedOption: T;
  errorMessage: string;
  markOption: (option: T) => void;
}

interface BadgeBaseProps {
  Icon: IconType;
  style: BadgeStyleProps;
  value: string;
  id: string;
}

interface BadgeWithLabelProps extends BadgeBaseProps {
  label: string;
}

interface AnswerOptionProps {
  idAnswer: number;
  answerMark: AnswerMark;
  answerData: Answer;
}

interface AnswerReviewProps {
  closeModal: () => void;
}

interface CallWildCardProps {
  callSeconds: string;
}

interface DividedWildCardProps {
  isPopUpVisible: boolean;
}

export type {
  InputType,
  LogoProps,
  LoadingWindowProps,
  Size,
  SpinnerProps,
  LoaderProps,
  CustomFormProps,
  FieldSetProps,
  BaseInputProps,
  InputProps,
  SelectProps,
  BaseButtonProps,
  ButtonWithLabelProps,
  ButtonWithIconProps,
  ButtonIconOnlyProps,
  ErrorMessageProps,
  HeaderProps,
  NavigationProps,
  CardListProps,
  CardProps,
  CardItemProps,
  ModalProps,
  AddQuestionFormProps,
  AddCategoryFormProps,
  ListInputControlProps,
  AddAnswerFormProps,
  MultiOptionInputProps,
  BadgeBaseProps,
  BadgeWithLabelProps,
  AnswerOptionProps,
  AnswerReviewProps,
  CallWildCardProps,
  DividedWildCardProps,
};
