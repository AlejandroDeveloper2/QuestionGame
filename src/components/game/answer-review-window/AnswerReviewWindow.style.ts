import styled from "styled-components";

import { breakpoints } from "@styles/Breakpoints";

const AnswerResultTitle = styled.h2`
  font-family: var(--secondary-font-family);
  font-weight: normal;
  font-size: var(--font-size-4xl);
  text-align: center;
  color: var(--gray);
  text-overflow: wrap;
`;

const MessageContainer = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
  justify-content: center;
  align-items: center;
  &:first-of-type svg {
    animation: scale-in 0.6s ease-in;
    @keyframes scale-in {
      0% {
        transform: scale(0);
      }
      50% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
      }
    }
  }
  span[id="match-result-span"],
  p[id="match-result-p"] {
    font-family: var(--primary-font-family);
    font-style: normal;
    font-weight: bold;
    font-size: var(--font-size-4xl);
    text-align: center;
    color: var(--primary-color-base);
  }
  p[id="match-result-p"] {
    font-size: var(--font-size-2xl);
    color: var(--gray);
  }

  @media (min-width: ${breakpoints.tablet}px) {
    width: 400px;
    p[id="match-result-p"] {
      font-size: var(--font-size-3xl);
    }
  }
  @media (min-width: ${breakpoints.desktop}px) {
    width: 500px;
  }
`;

const Controls = styled.div`
  width: 300px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-sm);

  @media (min-width: ${breakpoints.tablet}px) {
    width: 400px;
  }
  @media (min-width: ${breakpoints.desktop}px) {
    width: 500px;
  }
`;

export { AnswerResultTitle, MessageContainer, Controls };
