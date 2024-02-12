import styled from "styled-components";

import { breakpoints } from "@styles/Breakpoints";

export const SpinnerContainer = styled.div`
  width: auto;
  height: auto;
  gap: var(--spacing-sm);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  span {
    font-size: var(--font-size-md);
    color: var(--white);
    text-align: center;
    font-weight: bold;
    font-family: var(--primary-font-family);
    width: 70%;
  }

  @media (min-width: ${breakpoints.tablet}px) {
    span {
      font-size: var(--font-size-xl);
    }
  }
  @media (min-width: ${breakpoints.desktop}px) {
    span {
      width: 100%;
    }
  }
`;
