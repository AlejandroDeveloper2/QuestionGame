import { FaPause } from "react-icons/fa";

import {
  AnswerResultTitle,
  MessageContainer,
} from "./WaitingMatchWindow.style";

const WaitingMatchWindow = (): JSX.Element => {
  return (
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
