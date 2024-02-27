import styled from "styled-components";

import { BadgeStyleProps } from "@models/StylePropsModels";
import { breakpoints } from "@styles/Breakpoints";

const Badge = styled.div<BadgeStyleProps>`
  padding: ${({ padding }: BadgeStyleProps) =>
    padding ? padding : "var(--spacing-sm) var(--spacing-sm)"};
  border-radius: var(--radius-sm);
  background-color: ${({ backgroundcolor }: BadgeStyleProps) =>
    backgroundcolor};
  box-shadow: 0 0 10px var(--box-shadow-color);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-xs);

  svg {
    fill: ${({ color }: BadgeStyleProps) => color};
    font-size: var(--font-size-2xl);
    color: ${({ color }: BadgeStyleProps) => color};
  }
  span {
    font-size: ${({ fontsize }: BadgeStyleProps) =>
      fontsize ? fontsize : "var(--font-size-xl)"};
    font-family: var(--primary-font-family);
    color: ${({ color }: BadgeStyleProps) => color};
    text-align: center;
    font-weight: bold;
  }

  @media (min-width: ${breakpoints.tablet}px) {
    font-size: ${({ fontsize }: BadgeStyleProps) =>
      fontsize ? fontsize : "var(--font-size-2xl)"};
  }
`;

const BadgeContainer = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  justify-content: center;
  align-items: center;

  label {
    font-size: var(--font-size-md);
    font-family: var(--primary-font-family);
    color: var(--gray);
    text-align: center;
    font-weight: bold;
    text-transform: capitalize;
  }

  @media (min-width: ${breakpoints.tablet}px) {
    label {
      font-size: var(--font-size-xl);
    }
  }
`;

export { Badge, BadgeContainer };
