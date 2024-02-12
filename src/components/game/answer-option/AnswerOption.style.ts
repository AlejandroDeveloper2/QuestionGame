import styled from "styled-components";

import { breakpoints } from "@styles/Breakpoints";
import { AnswerOptionStyleProps } from "@models/StylePropsModels";

const AnswerBox = styled.div<AnswerOptionStyleProps>`
  width: 100%;
  height: 60px;
  border-radius: var(--radius-sm);
  border: 4px ${({ bordercolor }: AnswerOptionStyleProps) => bordercolor} solid; //var(--primary-color-base)
  position: relative;
  display: grid;
  place-content: center;
  background-color: ${({ background }: AnswerOptionStyleProps) =>
    background}; //var(--primary-color-100);
  transition: all 0.6s ease;
  opacity: ${({ opacity }: AnswerOptionStyleProps) => opacity};
  p {
    font-family: var(--primary-font-family);
    font-style: normal;
    font-weight: bold;
    font-size: var(--font-size-sm);
    color: ${({ color }: AnswerOptionStyleProps) => color}; //var(--gray);
    text-align: center;
  }
  cursor: pointer;
  &:hover {
    border-color: var(--white);
    background-color: var(--primary-color-200);
  }
  &:hover > div {
    transform: rotate(15deg);
  }

  @media (min-width: ${breakpoints.tablet}px) {
    height: 80px;
    font-size: var(--font-size-md);
  }
  @media (min-width: ${breakpoints.desktop}px) {
    height: 100px;
    font-size: var(--font-size-md);
  }
`;

const AnswerMarkBox = styled.div`
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  background-color: var(--primary-color-base);
  display: grid;
  place-content: center;
  transition: transform ease 0.6s;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 10px;
  margin: auto;

  span {
    font-family: var(--primary-font-family);
    font-weight: bold;
    font-size: var(--font-size-sm);
    color: var(--white);
    text-align: center;
    vertical-align: center;
  }

  @media (min-width: ${breakpoints.tablet}px) {
    font-size: var(--font-size-md);
  }
  @media (min-width: ${breakpoints.desktop}px) {
    width: 60px;
    height: 60px;
  }
`;

export { AnswerBox, AnswerMarkBox };
