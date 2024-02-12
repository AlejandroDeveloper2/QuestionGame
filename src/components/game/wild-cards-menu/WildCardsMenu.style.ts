import { breakpoints } from "@styles/Breakpoints";
import styled from "styled-components";

const WildCardsMenuContainer = styled.nav`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  border-top-right-radius: var(--radius-xl);
  border-top-left-radius: var(--radius-xl);
  background-color: var(--white);
  position: fixed;
  bottom: 0;
  left: 0;

  @media (min-width: ${breakpoints.tablet}px) {
    width: auto;
    left: auto;
    right: 0;
    top: 20%;
    bottom: auto;
    flex-direction: column;
    border-radius: var(--radius-xl);
  }

  @media (min-width: ${breakpoints.desktop}px) {
    height: 300px;
    top: 0;
    bottom: 0;
    margin: auto 0;
  }
`;

export { WildCardsMenuContainer };
