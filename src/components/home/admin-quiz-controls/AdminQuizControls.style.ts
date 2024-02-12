import styled from "styled-components";

import { breakpoints } from "@styles/Breakpoints";

const AdminQuizControlsContainer = styled.div`
  width: 300px;
  height: auto;
  gap: var(--spacing-md);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: ${breakpoints.tablet}px) {
    width: 400px;
  }
  @media (min-width: ${breakpoints.tablet}px) {
    width: 500px;
  }
`;

const QuestionInfoContainer = styled.div`
  width: 100%;
  gap: var(--spacing-sm);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const QuestionOptions = styled(QuestionInfoContainer)`
  flex-direction: row;
`;

export { AdminQuizControlsContainer, QuestionInfoContainer, QuestionOptions };
