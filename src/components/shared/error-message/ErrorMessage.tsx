import { MdError } from "react-icons/md";

import { ErrorMessageProps } from "@models/ComponentPropsModels";

import { ErrorMessageContainer } from "./ErrorMessage.style";

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <ErrorMessageContainer>
      <MdError />
      <p>{message}</p>
    </ErrorMessageContainer>
  );
};

export default ErrorMessage;
