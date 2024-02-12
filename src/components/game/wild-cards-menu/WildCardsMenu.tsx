import { FaDivide } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";

import useQuizMatchStore from "@zustand/quizMatchStore";
import useQuizGameStore from "@zustand/quizGameStore";
import { useModal } from "@hooks/index";

import { ButtonIconOnly, CallWildCard, Modal } from "@components/index";

import { WildCardsMenuContainer } from "./WildCardsMenu.style";

const WildCardsMenu = (): JSX.Element => {
  const { isModalVisible, closeModal, openModal } = useModal();
  const { spendDividedWildCard, spendCallWildCard } = useQuizMatchStore();
  const { stopMatch, quiz } = useQuizGameStore();

  return (
    <>
      <Modal isModalVisible={isModalVisible} closeModal={closeModal}>
        <CallWildCard />
      </Modal>
      <WildCardsMenuContainer>
        <ButtonIconOnly
          type="button"
          Icon={FaDivide}
          style={{
            background: "var(--white)",
            color: "var(--gray)",
            width: {
              sm: 120,
              md: 50,
              lg: 70,
            },
            height: {
              sm: 50,
              md: 50,
              lg: 70,
            },
          }}
          title="Comodin 50/50"
          onClick={spendDividedWildCard}
        />
        <ButtonIconOnly
          type="button"
          Icon={IoCall}
          style={{
            background: "var(--primary-color-base)",
            color: "var(--white)",
            width: {
              sm: 120,
              md: 50,
              lg: 70,
            },
            height: {
              sm: 50,
              md: 50,
              lg: 70,
            },
          }}
          title="Comodin llamada a un amigo"
          onClick={() => {
            spendCallWildCard(openModal, closeModal);
            stopMatch(quiz.id);
          }}
        />
      </WildCardsMenuContainer>
    </>
  );
};

export default WildCardsMenu;
