import styled from "styled-components";

import { breakpoints } from "@styles/Breakpoints";
import { HeaderStyleProps } from "@models/StylePropsModels";

const HeaderContainer = styled.header<HeaderStyleProps>`
  width: 100%;
  height: ${({ height }: HeaderStyleProps) => height.sm}px; //344px;
  padding: var(--spacing-4xl) var(--spacing-3xl);
  border-bottom-left-radius: var(--radius-xl);
  border-bottom-right-radius: var(--radius-xl);
  background-color: var(--white);
  display: flex;
  flex-direction: ${({ direction }: HeaderStyleProps) => direction.sm};
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xl);
  position: relative;
  overflow-y: visible;
  h1 {
    font-size: var(--font-size-3xl);
    font-family: var(--secondary-font-family);
    font-weight: 400;
    text-align: center;
    text-transform: uppercase;
    color: var(--gray);
  }
  div[id="input-container"] {
    width: 300px;
  }
  div[id="difficulty-badge"] {
    position: absolute;
    top: 10px;
    left: 10px;
    span {
      display: none;
    }
  }
  p {
    text-transform: capitalize;
    text-align: center;
    font-size: var(--font-size-sm);
    font-family: var(--primary-font-family);
    font-weight: normal;
    color: var(--gray);
    margin-top: var(--spacing-null);
    span {
      font-weight: bold;
    }
  }

  button {
    position: absolute;
    bottom: -15%;
    margin: auto;
    left: 0;
    right: 0;
  }

  @media (min-width: ${breakpoints.tablet}px) {
    height: ${({ height }: HeaderStyleProps) => height.md}px;
    flex-direction: ${({ direction }: HeaderStyleProps) => direction.md};
    div[id="input-container"] {
      width: 400px;
    }
    p {
      font-size: var(--font-size-md);
    }
    h1 {
      font-size: var(--font-size-4xl);
    }
  }

  @media (min-width: ${breakpoints.desktop}px) {
    div[id="difficulty-badge"] {
      span {
        display: block;
      }
    }
    height: ${({ height }: HeaderStyleProps) => height.lg}px;
    flex-direction: ${({ direction }: HeaderStyleProps) => direction.md};
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  justify-content: center;
  align-items: center;
`;

export { HeaderContainer, TitleContainer };
