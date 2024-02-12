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
  position: relative;
`;

const GameStatictics = styled.div`
  width: 350px;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
`;

export { MainContainer, GameStatictics };
