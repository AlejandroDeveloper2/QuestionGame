import styled from "styled-components";

import { ModalStyleProps } from "@models/StylePropsModels";

import { breakpoints } from "@styles/Breakpoints";

const ModalOverlay = styled.div<ModalStyleProps>`
  width: 100vw;
  height: 100%;
  position: fixed;
  background-color: var(--overlay-color);
  display: grid;
  place-content: center;
  top: 0;
  left: 0;
  z-index: ${({ isModalVisible }: ModalStyleProps) =>
    isModalVisible === "true" ? 50 : -50};
  transition: opacity 0.5s ease;
  opacity: ${({ isModalVisible }: ModalStyleProps) =>
    isModalVisible === "true" ? 1 : 0};
`;

const ModalBody = styled.div`
  width: 100%;
  height: auto;
  background-color: var(--white);
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xl);
  border-top-right-radius: var(--radius-xl);
  border-top-left-radius: var(--radius-xl);
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 60;
  padding: var(--spacing-xl) 0;

  button[title="Cerrar modal"] {
    position: absolute;
    top: 10px;
    left: 0;
    right: 0;
    margin: auto;
  }

  h1 {
    font-size: var(--font-size-2xl);
    color: var(--gray);
    text-align: center;
    font-weight: bold;
    font-family: var(--primary-font-family);
    margin-top: var(--spacing-xl);
  }

  @media (min-width: ${breakpoints.tablet}px) {
    position: relative;
    gap: var(--spacing-3xl);
    padding: var(--spacing-2xl);
    border-radius: var(--radius-xl);
    bottom: auto;
    left: auto;
    right: auto;
    margin: 0;
    h1 {
      font-size: var(--font-size-3xl);
    }
    width: auto;
  }

  @media (min-width: ${breakpoints.desktop}px) {
    gap: var(--spacing-4xl);
  }

  /* @keyframes move-up {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0);
    }
  }

  @keyframes move-left-fade-in {
    0% {
      opacity: 0;
      transform: translateX(-100%);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  } */
`;

export { ModalOverlay, ModalBody };
