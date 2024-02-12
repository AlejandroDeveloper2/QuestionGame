import styled from "styled-components";

import { LogoProps } from "@models/ComponentPropsModels";
import { breakpoints } from "@styles/Breakpoints";

const LogoContainer = styled.figure<LogoProps>`
  width: ${({ width }: LogoProps) => width.sm}px;
  height: ${({ height }: LogoProps) => height.sm}px;
  display: block;
  background-color: transparent;
  position: relative;

  @media (min-width: ${breakpoints.tablet}px) {
    width: ${({ width }: LogoProps) => width.md}px;
    height: ${({ height }: LogoProps) => height.md}px;
  }
  @media (min-width: ${breakpoints.desktop}px) {
    width: ${({ width }: LogoProps) => width.lg}px;
    height: ${({ height }: LogoProps) => height.lg}px;
  }
`;

const LogoFirstLayer = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--logo-overlay-color-2);
  display: grid;
  place-content: center;
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 50%;
`;

const LogoSecondLayer = styled.div`
  width: 160px;
  height: 160px;
  background-color: var(--logo-overlay-color-1);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: var(--spacing-2xs);
  z-index: 2;
  border-radius: 50%;
  animation-name: shake;
  animation-duration: 2s;
  animation-timing-function: ease;
  animation-fill-mode: both;
  animation-iteration-count: infinite;
  animation-direction: alternate;

  span {
    font-size: var(--font-size-2xl);
    font-family: var(--secondary-font-family);
    text-align: center;
    color: var(--white);
    text-transform: uppercase;
  }
  @media (min-width: ${breakpoints.tablet}px) {
    width: 240px;
    height: 240px;
  }
  @media (min-width: ${breakpoints.desktop}px) {
    width: 280px;
    height: 280px;
  }

  @keyframes shake {
    0% {
      transform: rotate(-15deg);
    }
    100% {
      transform: rotate(15deg);
    }
  }
`;

export { LogoContainer, LogoFirstLayer, LogoSecondLayer };
