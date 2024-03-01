import styled from "styled-components";

import { breakpoints } from "@styles/Breakpoints";
import {
  iconIllustration1,
  iconIllustration2,
  iconIllustrationStyle,
} from "@styles/GlobalStyles.style";

const PageContainer = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-4xl);
  flex-direction: column;
  background-color: transparent;
  position: relative;

  svg[id="figure-1"],
  svg[id="figure-2"] {
    ${iconIllustrationStyle}
  }
  svg[id="figure-1"] {
    ${iconIllustration1}
  }
  svg[id="figure-2"] {
    ${iconIllustration2}
  }
`;

const LoginFormContainer = styled.div`
  width: 300px;
  height: auto;
  border-top: solid 4px var(--primary-color-100);
  padding-top: var(--spacing-2xl);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  animation-name: move-up;
  animation-duration: 0.4s;
  animation-timing-function: ease-in;
  animation-delay: 2s;
  h1 {
    font-size: var(--font-size-3xl);
    font-family: var(--secondary-font-family);
    text-align: center;
    text-transform: uppercase;
    color: var(--white);
    font-weight: 400;
  }
  form {
    fieldset {
      div[id="input-container"] {
        width: 300px;
        label {
          color: var(--white);
        }
      }
    }
  }

  @media (min-width: ${breakpoints.tablet}px) {
    width: 400px;
    h1 {
      font-size: var(--font-size-4xl);
    }
    form {
      fieldset {
        div[id="input-container"] {
          width: 400px;
        }
      }
    }
    @media (min-width: ${breakpoints.desktop}px) {
      width: 500px;
      form {
        fieldset {
          div[id="input-container"] {
            width: 500px;
          }
        }
      }
    }

    @keyframes move-up {
      0% {
        transform: translateY(100%);
      }
      100% {
        transform: translateY(0);
      }
    }
  }
`;

export { LoginFormContainer, PageContainer };
