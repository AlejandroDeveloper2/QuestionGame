import styled from "styled-components";

import { breakpoints } from "@styles/Breakpoints";

const MultiOptionInputContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-xs);
  overflow: visible;

  label {
    font-size: var(--font-size-md);
    font-family: var(--primary-font-family);
    font-weight: bold;
    color: var(--primary-color-base);
    text-align: center;
    text-transform: capitalize;
  }

  @media (min-width: ${breakpoints.tablet}px) {
    label {
      font-size: var(--font-size-xl);
    }
  }
`;

const OptionList = styled.ol`
  width: 100%;
  display: flex;
  gap: var(--spacing-xs);
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: var(--spacing-2xs) 0;

  li {
    list-style: none;
    display: block;
  }

  @media (min-width: ${breakpoints.tablet}px) {
    gap: var(--spacing-sm);
  }
  @media (min-width: ${breakpoints.tablet}px) {
    gap: var(--spacing-md);
  }
`;

export { MultiOptionInputContainer, OptionList };
