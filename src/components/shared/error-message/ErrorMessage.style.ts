import { breakpoints } from "@styles/Breakpoints";
import styled from "styled-components";

const ErrorMessageContainer = styled.div`
  width: 100%;
  background-color: transparent;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-sm);
  animation-name: move-left;
  animation-duration: 0.6s;
  animation-timing-function: ease-in;

  p {
    font-size: var(--font-size-xs);
    font-family: var(--primary-font-family);
    font-weight: bold;
    text-align: center;
    text-transform: capitalize;
    color: var(--red-light);
  }

  @media (min-width: ${breakpoints.tablet}px) {
    p {
      font-size: var(--font-size-sm);
    }
  }

  @keyframes move-left {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(0);
    }
  }
`;

export { ErrorMessageContainer };
