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
  svg[id="call-icon"] {
    width: 100px;
    height: 100px;
    animation: scale-in 0.8s ease-in both alternate infinite;
    fill: var(--primary-color-base);
    @keyframes scale-in {
      0% {
        transform: scale(1);
      }
      100% {
        transform: scale(1.2);
      }
    }
  }
  p {
    font-family: var(--primary-font-family);
    font-style: normal;
    font-weight: bold;
    text-align: center;
    color: var(--primary-color-base);
    font-size: var(--font-size-md);
  }

  @media (min-width: ${breakpoints.tablet}px) {
    width: 400px;
    p {
      font-size: var(--font-size-xl);
    }
  }
  @media (min-width: ${breakpoints.desktop}px) {
    width: 500px;
  }
`;
export { AnswerResultTitle, MessageContainer };
