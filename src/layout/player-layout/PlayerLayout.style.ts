import styled from "styled-components";

import { breakpoints } from "@styles/Breakpoints";

const MainContainer = styled.main`
  width: 100vw;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
  justify-content: flex-start;
  align-items: center;
  padding-bottom: var(--spacing-2xl);
  overflow: hidden;
  position: relative;
  div[id="title-container"] {
    p {
      display: none;
    }
  }
  div[id="badge-time"],
  div[id="badge-money"] {
    padding: var(--spacing-sm);
    span {
      font-size: var(--font-size-2xl);
    }
  }

  @media (min-width: ${breakpoints.tablet}px) {
    div[id="badge-time"],
    div[id="badge-money"] {
      padding: var(--spacing-md);
      span {
        font-size: var(--font-size-3xl);
      }
    }
  }
`;

const GameStatictics = styled.div`
  width: 350px;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
`;

export { MainContainer, GameStatictics };
