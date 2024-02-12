import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

import { useAnswerForm, useCardActions, useModal } from "@hooks/index";
import { CardItemProps, CardProps } from "@models/ComponentPropsModels";

import {
  AddCategoryForm,
  AddQuestionForm,
  ButtonIconOnly,
  Modal,
} from "@components/index";

import { Actions, CardContainer, CardItemElement } from "./Card.style";
import { getInitialValues } from "@utils/functions";
import {
  AddCategoryFormData,
  AddQuestionFormData,
} from "@models/FormDataModel";

const Card = (props: CardProps): JSX.Element => {
  const { title, id, data, type, children } = props;
  const { isModalVisible, closeModal, openModal } = useModal();
  const { deleteItem } = useCardActions(type, id);
  const { toggleForm, isAddAnswerFormOpen } = useAnswerForm();

  return (
    <>
      <Modal
        modalTitle={
          type === "question" ? "Editar pregunta" : "Editar categoría"
        }
        isModalVisible={isModalVisible}
        closeModal={closeModal}
        hasCloseButton
      >
        {type === "question" ? (
          <AddQuestionForm
            id={id}
            initialValues={getInitialValues<AddQuestionFormData>(type, data)}
            isAddAnswerFormOpen={isAddAnswerFormOpen}
            mode="edit"
            closeModal={closeModal}
            toggleForm={toggleForm}
          />
        ) : (
          <AddCategoryForm
            id={id}
            initialValues={getInitialValues<AddCategoryFormData>(type, data)}
            closeModal={closeModal}
            mode="edit"
          />
        )}
      </Modal>
      <CardContainer>
        <h3>{title}</h3>
        <ul>{children}</ul>
        <Actions>
          <ButtonIconOnly
            Icon={FaTrashAlt}
            type="button"
            style={{
              background: "var(--white)",
              color: "var(--gray)",
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
            title="Eliminar registro"
            onClick={deleteItem}
          />
          <ButtonIconOnly
            type="button"
            Icon={MdEdit}
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
            title="Editar registro"
            onClick={openModal}
          />
        </Actions>
      </CardContainer>
    </>
  );
};

const CardItem = (props: CardItemProps): JSX.Element => {
  const { itemValue, itemTitle, Icon } = props;
  return (
    <CardItemElement>
      <Icon />
      <span>
        <small>{itemTitle}</small> : {itemValue}
      </span>
    </CardItemElement>
  );
};

Card.Item = CardItem;

export default Card;
