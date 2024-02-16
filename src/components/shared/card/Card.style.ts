import { breakpoints } from "@styles/Breakpoints";
import styled from "styled-components";

const CardContainer = styled.div`
  width: 300px;
  border-radius: var(--radius-xl);
  background-color: var(--white);
  gap: var(--spacing-sm);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  align-self: center;
  justify-self: center;
  box-shadow: 0 0 10px var(--box-shadow-color);
  padding: var(--spacing-md) var(--spacing-xl);
  h3 {
    font-size: var(--font-size-xl);
    font-family: var(--primary-font-family);
    font-weight: bold;
    color: var(--gray);
    text-align: center;
    text-transform: capitalize;
    text-overflow: ellipsis;
  }

  ul {
    width: 250px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  @media (min-width: ${breakpoints.tablet}px) {
    h3 {
      font-size: var(--font-size-2xl);
    }
  }

  @media (min-width: ${breakpoints.desktop}px) {
    width: 350px;
  }
`;

const Actions = styled.div`
  width: auto;
  height: auto;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-xs);
`;

const CardItemElement = styled.li`
  display: inline-flex;
  gap: var(--spacing-xs);
  justify-content: center;
  align-items: center;
  list-style: none;
  svg {
    fill: var(--gray);
    font-size: var(--font-size-2xl);
  }
  span {
    font-size: var(--font-size-sm);
    font-family: var(--primary-font-family);
    font-weight: normal;
    color: var(--gray);
    text-align: center;
    text-transform: capitalize;
    vertical-align: center;
    small {
      font-weight: bold;
    }
  }
  @media (min-width: ${breakpoints.tablet}px) {
    span {
      font-size: var(--font-size-md);
    }
  }
`;

export { CardContainer, Actions, CardItemElement };
