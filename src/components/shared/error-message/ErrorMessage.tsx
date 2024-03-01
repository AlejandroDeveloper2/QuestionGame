import { ErrorMessageProps } from "@models/ComponentPropsModels";

import { ErrorMessageContainer } from "./ErrorMessage.style";

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <ErrorMessageContainer>
      <p>{message}</p>
    </ErrorMessageContainer>
  );
};

export default ErrorMessage;
