import { useState } from "react";

const useModal = (customVisible?: boolean) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(
    customVisible !== undefined ? customVisible : false
  );

  const closeModal = (): void => {
    setIsModalVisible(false);
  };

  const openModal = (): void => {
    setIsModalVisible(true);
  };

  return {
    isModalVisible,
    closeModal,
    openModal,
  };
};
export default useModal;
