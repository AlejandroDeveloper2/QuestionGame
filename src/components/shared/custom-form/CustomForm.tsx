import {
  CustomFormProps,
  ErrorBoxProps,
  FieldSetProps,
} from "@models/ComponentPropsModels";

import {
  ButtonWithIcon,
  ErrorMessage,
  Input,
  ListInputControl,
  Select,
  MultiOptionInput,
} from "@components/index";

import {
  ErrorBoxContainer,
  FieldSetContainer,
  FormBody,
} from "./CustomForm.style";

const CustomForm = (props: CustomFormProps): JSX.Element => {
  const { children, formRef, handleSubmit } = props;

  return (
    <FormBody ref={formRef} onSubmit={handleSubmit}>
      {children}
    </FormBody>
  );
};

const FieldSet = (props: FieldSetProps): JSX.Element => {
  const { children, fieldSetStyle } = props;
  return (
    <FieldSetContainer width={fieldSetStyle.width}>{children}</FieldSetContainer>
  );
};

const ErrorBox = ({ errors }: ErrorBoxProps): JSX.Element => {
  return (
    <ErrorBoxContainer
      style={{ display: errors.length === 0 ? "none" : "flex" }}
    >
      {errors.map((error, i) => (
        <ErrorMessage key={i} message={error.message} />
      ))}
    </ErrorBoxContainer>
  );
};

CustomForm.FieldSet = FieldSet;
CustomForm.Input = Input;
CustomForm.Select = Select;
CustomForm.Button = ButtonWithIcon;
CustomForm.ErrorBox = ErrorBox;
CustomForm.ListInputControl = ListInputControl;
CustomForm.MultiOptionInput = MultiOptionInput;

export default CustomForm;
