import { css } from "styled-components";

import { breakpoints } from "./Breakpoints";

export const iconIllustrationStyle = css`
  position: absolute;
  width: 40px;
  height: 40px;
  animation-name: rotate;
  animation-duration: 3s;
  animation-timing-function: ease-out;
  animation-fill-mode: both;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  @media (min-width: ${breakpoints.tablet}px) {
    width: 60px;
    height: 60px;
  }
  @media (min-width: ${breakpoints.desktop}px) {
    width: 70px;
    height: 70px;
  }
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const iconIllustration1 = css`
  top: 20px;
  left: 20px;
  transform: rotate(25deg);
`;
export const iconIllustration2 = css`
  bottom: 20px;
  right: 20px;
  transform: rotate(-25deg);
`;
