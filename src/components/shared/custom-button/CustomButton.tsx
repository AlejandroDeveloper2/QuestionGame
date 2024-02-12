import {
  BaseButtonProps,
  ButtonIconOnlyProps,
  ButtonWithIconProps,
  ButtonWithLabelProps,
} from "@models/ComponentPropsModels";

import { Button } from "./CustomButton.style";

const BaseButton = (props: BaseButtonProps): JSX.Element => {
  const { style, title, children, onClick, type, disabled } = props;
  return (
    <Button
      disabled={disabled ? disabled : false}
      title={title}
      {...style}
      onClick={onClick}
      type={type ? type : "submit"}
    >
      {children}
    </Button>
  );
};

const ButtonWithLabel = (props: ButtonWithLabelProps): JSX.Element => {
  const { label, children } = props;

  return (
    <BaseButton {...props}>
      {children}
      <span>{label}</span>
    </BaseButton>
  );
};

const ButtonWithIcon = (props: ButtonWithIconProps): JSX.Element => {
  const { Icon } = props;

  return (
    <ButtonWithLabel {...props}>
      <Icon />
    </ButtonWithLabel>
  );
};

const ButtonIconOnly = (props: ButtonIconOnlyProps): JSX.Element => {
  const { Icon } = props;

  return (
    <BaseButton {...props}>
      <Icon />
    </BaseButton>
  );
};

export default BaseButton;
export { ButtonWithLabel, ButtonWithIcon, ButtonIconOnly };
