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
  const { closeModal } = useModal();
  const { match, spendDividedWildCard, spendCallWildCard } =
    useQuizMatchStore();
  const { stopMatch, quiz } = useQuizGameStore();
  const { callSeconds } = useCallTimer();
  useFloatPop();

  return (
    <>
      <DividedWildCard isPopUpVisible={match.isDividedWildCard} />
      <Modal isModalVisible={match.isCallWildCard} closeModal={closeModal}>
        <CallWildCard callSeconds={callSeconds} />
      </Modal>
      <WildCardsMenuContainer>
        <ButtonIconOnly
          disabled={
            match.isDividedWildCard ||
            quiz.isGameCompleted ||
            !quiz.isMatchStarted
          }
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
            spendDividedWildCard();
          }}
        />
        <ButtonIconOnly
          disabled={
            match.isCallWildCard || quiz.isGameCompleted || !quiz.isMatchStarted
          }
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
            spendCallWildCard();
            stopMatch(quiz.id);
          }}
        />
      </WildCardsMenuContainer>
    </>
  );
};

export default WildCardsMenu;
