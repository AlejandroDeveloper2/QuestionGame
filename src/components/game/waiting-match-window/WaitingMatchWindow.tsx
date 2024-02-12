import { FaPause } from "react-icons/fa";

import useQuizGameStore from "@zustand/quizGameStore";

import { Spinner } from "@components/index";

import {
  AnswerResultTitle,
  MessageContainer,
} from "./WaitingMatchWindow.style";

const WaitingMatchWindow = (): JSX.Element => {
  const { isLoading } = useQuizGameStore();

  return isLoading ? (
    <Spinner color="var(--primary-color-base)" />
  ) : (
    <>
      <AnswerResultTitle>Esperando</AnswerResultTitle>
      <MessageContainer>
        <FaPause />
        <p>Esperando a que se inicie el conteo regresivo!</p>
      </MessageContainer>
    </>
  );
};

export default WaitingMatchWindow;
