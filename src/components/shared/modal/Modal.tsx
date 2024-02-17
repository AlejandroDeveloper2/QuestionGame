import { MdClose } from "react-icons/md";

import { ModalProps } from "@models/ComponentPropsModels";

import { ButtonIconOnly } from "@components/shared/custom-button/CustomButton";
import { ModalBody, ModalOverlay } from "./Modal.style";

const Modal = (props: ModalProps): JSX.Element => {
  const { modalTitle, hasCloseButton, isModalVisible, closeModal, children } =
    props;

  return (
    <ModalOverlay ismodalvisible={String(isModalVisible)}>
      <ModalBody>
        {hasCloseButton ? (
          <ButtonIconOnly
            Icon={MdClose}
            style={{
              background: "var(--primary-color-base)",
              color: "var(--white)",
              width: {
                sm: 40,
                md: 40,
                lg: 40,
              },
              height: {
                sm: 40,
                md: 40,
                lg: 40,
              },
            }}
            title="Cerrar modal"
            onClick={closeModal}
          />
        ) : null}
        {modalTitle ? <h1>{modalTitle}</h1> : null}
        {children}
      </ModalBody>
    </ModalOverlay>
  );
};

export default Modal;
