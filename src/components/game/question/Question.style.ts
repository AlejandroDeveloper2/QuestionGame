import { breakpoints } from "@styles/Breakpoints";
import styled from "styled-components";

const QuestionContainer = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-md);
  position: relative;
`;

const QuestionBox = styled.div`
  width: 90%;
  border-radius: var(--radius-sm);
  position: relative;
  display: grid;
  place-content: center;
  padding: var(--spacing-4xl) var(--spacing-2xl);
  background-color: var(--white);
  overflow-x: visible;
  animation: move-to-left 0.7s ease alternate;
  p {
    font-family: var(--primary-font-family);
    font-style: normal;
    font-weight: 900;
    font-size: var(--font-size-3xl);
    color: var(--gray);
    text-align: center;
  }
  div[id="question-badge"] {
    position: absolute;
    left: -20px;
    top: 25%;
    bottom: 0;
    display: none;
    height: 60px;
  }

  @media (min-width: ${breakpoints.tablet}px) {
    width: 600px;
    p {
      font-size: var(--font-size-4xl);
    }
    div[id="question-badge"] {
      display: block;
    }
  }
  @media (min-width: ${breakpoints.desktop}px) {
    width: 1150px;
  }

  @keyframes move-to-left {
    0% {
      transform: translateX(-10%);
    }

    100% {
      transform: translateX(0);
    }
  }
`;

const AnswerList = styled.ul`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-sm);
  li {
    list-style: none;
    display: block;
  }
  @media (min-width: ${breakpoints.tablet}px) {
    width: 600px;
  }

  @media (min-width: ${breakpoints.desktop}px) {
    width: 1150px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;

export { QuestionContainer, QuestionBox, AnswerList };
