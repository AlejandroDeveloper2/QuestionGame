import styled from "styled-components";

import { LoadingWindowStyleProps } from "@models/StylePropsModels";

import { breakpoints } from "@styles/Breakpoints";
import {
  iconIllustrationStyle,
  iconIllustration1,
  iconIllustration2,
} from "@styles/GlobalStyles.style";

const LoadingWindowContainer = styled.div<LoadingWindowStyleProps>`
  width: 100vw;
  height: 100vh;
  background-image: var(--bg-color);
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  display: grid;
  place-content: center;
  position: fixed;
  top: 0;
  left: 0;
  svg[id="figure-1"],
  svg[id="figure-2"] {
    ${iconIllustrationStyle}
  }
  svg[id="figure-1"] {
    ${iconIllustration1}
  }
  svg[id="figure-2"] {
    ${iconIllustration2}
  }
  opacity: ${({ opacity }: LoadingWindowStyleProps) => opacity};
  transition: opacity 0.6s ease;
  z-index: ${({ isLoading }: LoadingWindowStyleProps) =>
    isLoading === "false" ? -200 : 200};
`;

const Content = styled.div`
  width: auto;
  height: auto;
  gap: var(--spacing-sm);
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: ${breakpoints.tablet}px) {
    gap: var(--spacing-xl);
  }
`;

export { LoadingWindowContainer, Content };
