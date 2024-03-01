import { MdAdd } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

import { ListInputControlProps } from "@models/ComponentPropsModels";

import { ButtonIconOnly, ErrorMessage } from "@components/index";

import {
  ElementList,
  ListInputBody,
  ListInputContainer,
  Element,
} from "./ListInputControl.style";

const ListInputControl = (props: ListInputControlProps): JSX.Element => {
  const { label, options, name, errorMessage, toggleForm, removeOption } =
    props;

  return (
    <ListInputContainer id={name}>
      <label>{label}</label>
      <ListInputBody>
        <ElementList>
          {options.length > 0 ? (
            options.map((option, i) => (
              <Element
                key={i}
                style={{
                  border: !option["isCorrectAnswer"]
                    ? "solid 4px var(--red)"
                    : "solid 4px var(--primary-color-base)",
                }}
              >
                <IoMdClose onClick={() => removeOption(i)} />
                <p>{option.answerText}</p>
              </Element>
            ))
          ) : (
            <p id="message">No hay ópciones aun!</p>
          )}
        </ElementList>
        <ButtonIconOnly
          Icon={MdAdd}
          type="button"
          style={{
            background: "var(--primary-color-base)",
            color: "var(--white)",
            width: {
              sm: 60,
              md: 60,
              lg: 60,
            },
            height: {
              sm: 60,
              md: 60,
              lg: 60,
            },
          }}
          title="Agregar mas ópciones"
          onClick={toggleForm}
        />
      </ListInputBody>
      <ErrorMessage message={errorMessage} />
    </ListInputContainer>
  );
};

export default ListInputControl;
