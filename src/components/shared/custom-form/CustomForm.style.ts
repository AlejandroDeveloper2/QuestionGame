import styled from "styled-components";

import { breakpoints } from "@styles/Breakpoints";
import { FieldSetStyleProps } from "@models/StylePropsModels";

const FormBody = styled.form`
  width: auto;
  height: auto;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  gap: var(--spacing-sm);
  justify-content: flex-start;
  align-items: center;
  position: relative;
  /* margin-top: var(--spacing-2xl); */

  @media (min-width: ${breakpoints.desktop}px) {
    gap: var(--spacing-md);
  }
`;

const FieldSetContainer = styled.fieldset<FieldSetStyleProps>`
  width: ${({ width }: FieldSetStyleProps) => width.sm}%;
  height: auto;
  max-height: 300px;
  overflow-y: auto;
  gap: var(--spacing-sm);
  justify-content: flex-start;
  border: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);

  @media (min-height: 700px) {
    max-height: 500px;
  }

  @media (min-width: ${breakpoints.tablet}px) {
    width: ${({ width }: FieldSetStyleProps) => width.md}%;
    padding: var(--spacing-md);
    max-height: 600px;
    grid-template-columns: repeat(auto-fill, 400px);
  }

  @media (min-width: ${breakpoints.desktop}px) {
    gap: var(--spacing-md);
    max-height: 550px;
    width: ${({ width }: FieldSetStyleProps) => width.lg}px;
    grid-template-columns: repeat(auto-fill, 500px);
  }
`;

const ErrorBoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: transparent;
  justify-content: flex-start;
  align-items: center;
  gap: var(--spacing-sm);
  padding-bottom: var(--spacing-md);
  overflow-x: hidden;
  overflow-y: auto;
  height: 100px;

  @media (min-width: ${breakpoints.desktop}px) {
    gap: var(--spacing-md);
  }
`;

export { FormBody, FieldSetContainer, ErrorBoxContainer };
