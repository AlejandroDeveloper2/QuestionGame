import { CustomFormProps, FieldSetProps } from "@models/ComponentPropsModels";

import {
  ButtonWithIcon,
  Input,
  ListInputControl,
  Select,
  MultiOptionInput,
} from "@components/index";

import { FieldSetContainer, FormBody } from "./CustomForm.style";

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
    <FieldSetContainer width={fieldSetStyle.width}>
      {children}
    </FieldSetContainer>
  );
};

CustomForm.FieldSet = FieldSet;
CustomForm.Input = Input;
CustomForm.Select = Select;
CustomForm.Button = ButtonWithIcon;
CustomForm.ListInputControl = ListInputControl;
CustomForm.MultiOptionInput = MultiOptionInput;

export default CustomForm;
