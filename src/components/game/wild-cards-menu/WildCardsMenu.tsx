import { FaDivide } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";

import useQuizMatchStore from "@zustand/quizMatchStore";
import useQuizGameStore from "@zustand/quizGameStore";
import { useCallTimer, useFloatPop, useModal } from "@hooks/index";

import {
  ButtonIconOnly,
  CallWildCard,
  DividedWildCard,
  Modal,
} from "@components/index";

import { WildCardsMenuContainer } from "./WildCardsMenu.style";

const WildCardsMenu = (): JSX.Element => {
  const { isModalVisible, closeModal, openModal } = useModal();
  const {
    spendDividedWildCard,
    spendCallWildCard,
    selectedAnswers,
    isDividedWildCard,
  } = useQuizMatchStore();
  const { stopMatch, quiz } = useQuizGameStore();
  const { callSeconds, startCallTimer } = useCallTimer();
  const { isPopUpVisible, togglePopUp } = useFloatPop(
    selectedAnswers,
    isDividedWildCard
  );

  return (
    <>
      <DividedWildCard isPopUpVisible={isPopUpVisible} />
      <Modal isModalVisible={isModalVisible} closeModal={closeModal}>
        <CallWildCard callSeconds={callSeconds} />
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
          onClick={() => {
            stopMatch(quiz.id);
            togglePopUp();
            spendDividedWildCard();
          }}
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
            startCallTimer();
            stopMatch(quiz.id);
          }}
        />
      </WildCardsMenuContainer>
    </>
  );
};

export default WildCardsMenu;
