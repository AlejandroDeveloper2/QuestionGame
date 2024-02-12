import { EmptyIllustration } from "@assets/index";
import { EmptyContainer } from "./Empty.style";

const Empty = (): JSX.Element => {
  return (
    <EmptyContainer>
      <EmptyIllustration />
    </EmptyContainer>
  );
};

export default Empty;
