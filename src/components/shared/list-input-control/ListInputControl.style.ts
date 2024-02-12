import styled from "styled-components";

import { breakpoints } from "@styles/Breakpoints";

const ListInputContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-xs);

  label {
    font-size: var(--font-size-md);
    font-family: var(--primary-font-family);
    font-weight: bold;
    color: var(--primary-color-base);
    text-align: center;
    text-transform: capitalize;
  }

  @media (min-width: ${breakpoints.tablet}px) {
    width: 400px;
    label {
      font-size: var(--font-size-xl);
    }
  }
  @media (min-width: ${breakpoints.desktop}px) {
    width: 500px;
  }
`;

const ListInputBody = styled.div`
  width: 100%;
  display: inline-flex;
  gap: var(--spacing-xs);
  justify-content: flex-start;
  align-items: center;
`;

const ElementList = styled.ul`
  width: 240px;
  display: inline-flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  justify-content: flex-start;
  align-items: center;
  overflow-x: auto;

  @media (min-width: ${breakpoints.tablet}px) {
    width: 340px;
  }
  @media (min-width: ${breakpoints.desktop}px) {
    width: 440px;
  }
  p[id="message"] {
    font-size: var(--font-size-xl);
    font-family: var(--primary-font-family);
    font-weight: normal;
    color: var(--primary-color-base);
    text-align: center;
    text-transform: capitalize;
  }

  li {
    list-style: none;
    display: block;
  }
`;

const Element = styled.div`
  width: 120px;
  height: 70px;
  border-radius: var(--radius-sm);
  border: solid 4px var(--primary-color-base);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  animation: fade-in 0.5s ease-in;

  svg {
    fill: var(--gray);
    font-size: var(--font-size-2xl);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 4px;
    margin: auto;
    transition: all 0.5s ease;
    cursor: pointer;
    &:hover {
      transform: rotate(180deg);
    }
  }
  p {
    width: 60%;
    font-size: var(--font-size-xl);
    font-family: var(--primary-font-family);
    font-weight: normal;
    color: var(--primary-color-base);
    text-align: center;
    text-transform: capitalize;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media (min-width: ${breakpoints.tablet}px) {
    p {
      font-size: var(--font-size-2xl);
    }
  }

  @media (min-width: ${breakpoints.desktop}px) {
    width: 150px;
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export { ListInputContainer, ListInputBody, ElementList, Element };
