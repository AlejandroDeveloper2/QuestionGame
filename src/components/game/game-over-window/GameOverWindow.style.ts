import styled from "styled-components";

const LoserMessage = styled.p`
  font-family: var(--primary-font-family);
  font-style: normal;
  font-weight: bold;
  font-size: var(--font-size-md);
  text-align: center;
  color: var(--red);
`;

const GameResultTitle = styled.h2`
  font-family: var(--secondary-font-family);
  font-weight: normal;
  font-size: var(--font-size-4xl);
  text-align: center;
  color: var(--primary-color-base);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  span {
    color: var(--gray);
    margin-left: var(--spacing-xs);
  }
`;

const PlayerFinalStatistics = styled.ul`
  width: auto;
  height: auto;
  gap: var(--spacing-sm);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  li {
    display: block;
    list-style: none;
  }
`;

export { LoserMessage, PlayerFinalStatistics, GameResultTitle };
