import styled, { css } from "styled-components";

import { breakpoints } from "@styles/Breakpoints";

const inputTextStyle = css`
  font-size: var(--font-size-md);
  font-family: var(--primary-font-family);
  font-weight: normal;
  text-align: left;

  @media (min-width: ${breakpoints.tablet}px) {
    font-size: var(--font-size-xl);
  }
`;

const InputContainer = styled.div`
  width: 100%;
  justify-self: center;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  justify-content: center;
  align-items: center;

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

const InputBody = styled.kbd`
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-sm);
  display: inline-flex;
  gap: var(--spacing-sm);
  justify-content: flex-start;
  align-items: center;
  background-color: var(--white);
  border: solid 4px var(--primary-color-base);
  cursor: pointer;
  transition: border 0.5s ease;

  svg {
    fill: var(--primary-color-base);
    font-size: var(--font-size-2xl);
    transition: transform 0.5s ease;
  }

  &:hover {
    border: 4px solid var(--primary-color-400);
    svg[id="input-icon"] {
      transform: rotate(15deg);
    }
    svg[id="select-arrow"] {
      transform: rotate(90deg);
    }
  }

  @media (min-width: ${breakpoints.tablet}px) {
    gap: var(--spacing-md);
  }
`;

const InputElement = styled.input`
  outline: none;
  border: none;
  width: 80%;
  height: auto;
  ${inputTextStyle};
  color: var(--primary-color-base);
  &::placeholder {
    ${inputTextStyle};
    color: var(--primary-color-200);
  }
`;

const SelectElement = styled.select`
  outline: none;
  border: none;
  width: 80%;
  ${inputTextStyle};
  color: var(--primary-color-base);
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;

  &::-ms-expand {
    display: none;
  }
  transition: all 0.5s ease;
`;

export { InputContainer, InputBody, InputElement, SelectElement };
