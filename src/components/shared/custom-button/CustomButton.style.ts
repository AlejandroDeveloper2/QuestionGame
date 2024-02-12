import styled from "styled-components";

import { ButtonStyleType } from "@models/StylePropsModels";

import { breakpoints } from "@styles/Breakpoints";

const Button = styled.button<ButtonStyleType>`
  width: ${({ width }: ButtonStyleType) => width.sm}px;
  height: ${({ height }: ButtonStyleType) => height.sm}px;
  background-color: ${({ background }: ButtonStyleType) => background};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  display: flex;
  gap: var(--spacing-xs);
  justify-content: center;
  align-items: center;
  border-radius: var(--radius-sm);
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 10px var(--box-shadow-color);
  span {
    font-size: var(--font-size-xl);
    font-family: var(--primary-font-family);
    font-weight: bold;
    color: ${({ color }: ButtonStyleType) => color};
    text-align: center;
    text-transform: capitalize;
  }
  svg {
    font-size: var(--font-size-2xl);
    fill: ${({ color }: ButtonStyleType) => color};
    color: ${({ color }: ButtonStyleType) => color};
  }
  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: var(--box-shadow-color);
    transform: translateY(-100%);
    transition: transform 0.5s ease;
    top: 0;
    left: 0;
  }
  &:hover::before {
    transform: translateY(0);
  }

  @media (min-width: ${breakpoints.tablet}px) {
    width: ${({ width }: ButtonStyleType) => width.md}px;
    height: ${({ height }: ButtonStyleType) => height.md}px;
    span {
      font-size: var(--font-size-2xl);
    }
  }
  @media (min-width: ${breakpoints.desktop}px) {
    width: ${({ width }: ButtonStyleType) => width.lg}px;
    height: ${({ height }: ButtonStyleType) => height.lg}px;
  }
`;

export { Button };
