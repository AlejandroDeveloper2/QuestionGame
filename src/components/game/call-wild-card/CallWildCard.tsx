import { IoCall } from "react-icons/io5";
import { MdOutlineTimer } from "react-icons/md";

import { CallWildCardProps } from "@models/ComponentPropsModels";

import { BadgeWithLabel } from "@components/index";

import { AnswerResultTitle, MessageContainer } from "./CallWildCard.style";

const CallWildCard = ({ callSeconds }: CallWildCardProps): JSX.Element => {
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
            backgroundcolor: "var(--primary-color-base)",
            color: "var(--white)",
          }}
          value={callSeconds + "s"}
        />
      </MessageContainer>
    </>
  );
};

export default CallWildCard;
