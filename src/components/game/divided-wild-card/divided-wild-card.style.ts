import styled from "styled-components";

import { DividedWildCardStyleProps } from "@models/StylePropsModels";
import { breakpoints } from "@styles/Breakpoints";

const PopUpContainer = styled.div<DividedWildCardStyleProps>`
  width: 100px;
  padding: var(--spacing-md);
  position: fixed;
  opacity: ${({ positionx }: DividedWildCardStyleProps) => positionx};
  z-index: ${({ positionx }: DividedWildCardStyleProps) =>
    positionx === 1 ? 10 : -10};
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-sm);
  background-color: var(--light-gray);
  border-radius: var(--radius-sm);
  box-shadow: 0 0 10px var(--box-shadow-color);
  transition: all ease 0.6s;
  animation: vibrate 1s linear infinite alternate both;
  svg {
    fill: var(--primary-color-base);
    font-size: var(--font-size-3xl);
  }
  p {
    display: none;
  }
  p,
  span {
    font-family: var(--primary-font-family);
    font-size: var(--font-size-sm);
    color: var(--primary-color-base);
    font-weight: 500;
    text-transform: wrap;
    text-align: center;
    text-transform: capitalize;
  }
  span {
    color: var(--primary-color-400);
    font-size: var(--font-size-xl);
    font-weight: 800;
  }

  @media (min-width: ${breakpoints.tablet}px) {
    width: 140px;
    top: auto;
    bottom: 15%;
    p {
      display: block;
      font-size: var(--font-size-md);
    }
    span {
      font-size: var(--font-size-2xl);
    }
  }
  @keyframes vibrate {
    0% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
    }
  }
`;

export { PopUpContainer };
