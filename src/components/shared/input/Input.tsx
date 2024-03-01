import { IoIosArrowForward } from "react-icons/io";

import {
  BaseInputProps,
  InputProps,
  SelectProps,
} from "@models/ComponentPropsModels";

import { ErrorMessage } from "@components/index";

import {
  InputBody,
  InputContainer,
  InputElement,
  SelectElement,
} from "./Input.style";

const BaseInput = (props: BaseInputProps): JSX.Element => {
  const { label, name, errorMessage, Icon, children } = props;
  return (
    <InputContainer id="input-container">
      <label htmlFor={name}>{label}</label>
      <InputBody id={name}>
        <Icon id="input-icon" />
        {children}
      </InputBody>
      <ErrorMessage message={errorMessage} />
    </InputContainer>
  );
};

const Input = (props: InputProps): JSX.Element => {
  const {
    label,
    type,
    placeholder,
    name,
    Icon,
    value,
    errorMessage,
    disabled,
    onChange,
  } = props;

  return (
    <BaseInput
      label={label}
      Icon={Icon}
      name={name}
      errorMessage={errorMessage}
    >
      <InputElement
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled ? disabled : false}
      />
    </BaseInput>
  );
};

const Select = (props: SelectProps): JSX.Element => {
  const {
    label,
    name,
    Icon,
    disabled,
    options,
    inputKey,
    errorMessage,
    onChange,
    value,
  } = props;
  return (
    <BaseInput
      label={label}
      Icon={Icon}
      name={name}
      errorMessage={errorMessage}
    >
      <SelectElement
        disabled={disabled ? disabled : false}
        onChange={onChange}
        name={name}
        value={value}
      >
        <option value="" defaultValue={value}>
          --Selecione una opción--
        </option>
        {options.map((option, i) => (
          <option key={i} value={option[inputKey]}>
            {option[inputKey]}
          </option>
        ))}
      </SelectElement>
      <IoIosArrowForward id="select-arrow" />
    </BaseInput>
  );
};

export { Select };
export default Input;
