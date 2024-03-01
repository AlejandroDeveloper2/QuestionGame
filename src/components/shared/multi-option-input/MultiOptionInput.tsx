import { MultiOptionInputProps } from "@models/ComponentPropsModels";

import { ButtonIconOnly, ErrorMessage } from "@components/index";

import {
  MultiOptionInputContainer,
  OptionList,
} from "./MultiOptionInput.style";

const MultiOptionInput = (props: MultiOptionInputProps): JSX.Element => {
  const {
    label,
    options,
    selectedOption,
    name,
    icons,
    errorMessage,
    markOption,
  } = props;

  const parseBooleanOptions = (): string[] => {
    const parsedOptions = options.map((option) => {
      if (option === false) return "No";
      else return "Si";
    });
    return parsedOptions;
  };

  return (
    <MultiOptionInputContainer id={name}>
      <label>{label}</label>
      <OptionList>
        {options.map((option, i) => (
          <ButtonIconOnly
            key={i}
            type="button"
            Icon={icons[i]}
            style={{
              background:
                selectedOption === option
                  ? "var(--primary-color-base)"
                  : "var(--white)",
              color: selectedOption === option ? "var(--white)" : "var(--gray)",
              width: {
                sm: 300 / options.length - 8,
                md: 400 / options.length - 16,
                lg: 500 / options.length - 18,
              },
              height: {
                sm: 60,
                md: 60,
                lg: 60,
              },
            }}
            title={
              typeof options[i] === "boolean"
                ? parseBooleanOptions()[i]
                : options[i]
            }
            onClick={() => markOption(option)}
          />
        ))}
      </OptionList>
      <ErrorMessage message={errorMessage} />
    </MultiOptionInputContainer>
  );
};

export default MultiOptionInput;
