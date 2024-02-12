import { breakpoints } from "@styles/Breakpoints";
import styled from "styled-components";

const MainContainer = styled.main`
  width: 100vw;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
  justify-content: flex-start;
  align-items: center;
  padding-bottom: var(--spacing-2xl);
  overflow: hidden;
  h2 {
    text-transform: capitalize;
    text-align: center;
    font-size: var(--font-size-2xl);
    font-family: var(--primary-font-family);
    font-weight: bold;
    color: var(--white);
    margin-top: var(--spacing-md);
  }

  @media (min-width: ${breakpoints.tablet}px) {
    h2 {
      font-size: var(--font-size-3xl);
    }
  }
`;

export { MainContainer };
