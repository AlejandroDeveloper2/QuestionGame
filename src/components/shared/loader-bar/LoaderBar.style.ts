import styled from "styled-components";

import { LoadStyleProps } from "@models/StylePropsModels";

import { breakpoints } from "@styles/Breakpoints";

const LoaderContainer = styled.div`
  width: 200px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: var(--spacing-sm);
  span {
    font-family: var(--secondary-font-family);
    font-size: var(--font-size-sm);
    text-align: center;
    color: var(--white);
    text-transform: uppercase;
  }
  @media (min-width: ${breakpoints.tablet}px) {
    width: 300px;
    span {
      font-size: var(--font-size-md);
    }
  }
  @media (min-width: ${breakpoints.desktop}px) {
    width: 350px;
  }
`;

const LoaderBody = styled.div`
  width: 100%;
  height: 30px;
  border-radius: var(--radius-sm);
  background-color: var(--white);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 3px;

  @media (min-width: ${breakpoints.tablet}px) {
    height: 40px;
  }
  @media (min-width: ${breakpoints.desktop}px) {
    height: 50px;
  }
`;

const Load = styled.div<LoadStyleProps>`
  width: ${({ load }: LoadStyleProps) => load}%;
  height: 20px;
  background-color: var(--primary-color-base);
  border-radius: var(--radius-sm);
  display: inline-block;
  transition: all 0.5s ease;

  @media (min-width: ${breakpoints.tablet}px) {
    height: 30px;
  }
  @media (min-width: ${breakpoints.desktop}px) {
    height: 40px;
  }
`;

export { LoaderContainer, LoaderBody, Load };
