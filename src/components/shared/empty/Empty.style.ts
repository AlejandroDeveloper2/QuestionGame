import styled from "styled-components";

import { breakpoints } from "@styles/Breakpoints";

const EmptyContainer = styled.div`
  width: 300px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-2xl);
  svg {
    transform: scale(0.7);
  }

  @media (min-width: ${breakpoints.tablet}px) {
    width: 624px;
    transform: scale(1);
  }
  @media (min-width: ${breakpoints.desktop}px) {
    width: 1098px;
  }
`;

export { EmptyContainer };
