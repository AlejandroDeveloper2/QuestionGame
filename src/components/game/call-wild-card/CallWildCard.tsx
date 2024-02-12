import { IoCall } from "react-icons/io5";
import { MdOutlineTimer } from "react-icons/md";

import { useCallTimer } from "@hooks/index";

import { BadgeWithLabel } from "@components/index";

import { AnswerResultTitle, MessageContainer } from "./CallWildCard.style";

const CallWildCard = (): JSX.Element => {
  const seconds = useCallTimer();

  return (
    <>
      <AnswerResultTitle>LLamada a un amigo</AnswerResultTitle>
      <MessageContainer>
        <IoCall id="call-icon" />
        <p>Tienes 20 segundos para que tu amigo responda!</p>
        <BadgeWithLabel
          label="Tiempo del comodin"
          Icon={MdOutlineTimer}
          style={{
            backgroundColor: "var(--primary-color-base)",
            color: "var(--white)",
          }}
          value={seconds + "s"}
        />
      </MessageContainer>
    </>
  );
};

export default CallWildCard;
