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
  figure {
    display: none;
  }
  @media (min-width: ${breakpoints.tablet}px) {
    figure {
      display: block;
    }
  }
`;

const QuestionBox = styled.div`
  width: 340px;
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
    font-weight: bold;
    font-size: var(--font-size-sm);
    color: var(--gray);
    text-align: center;
  }
  div[id="question-badge"] {
    position: absolute;
    left: -20px;
    top: 25%;
    bottom: 0;
  }

  @media (min-width: ${breakpoints.tablet}px) {
    width: 500px;
    font-size: var(--font-size-md);
  }
  @media (min-width: ${breakpoints.desktop}px) {
    width: 1020px;
    font-size: var(--font-size-md);
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
  width: 340px;
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
    width: 500px;
  }

  @media (min-width: ${breakpoints.desktop}px) {
    width: 1020px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;

export { QuestionContainer, QuestionBox, AnswerList };
