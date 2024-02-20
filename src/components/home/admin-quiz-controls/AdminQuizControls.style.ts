import styled from "styled-components";

import { breakpoints } from "@styles/Breakpoints";
import { ButtonStyleType } from "@models/StylePropsModels";

const AdminQuizControlsContainer = styled.div`
  width: 300px;
  height: auto;
  gap: var(--spacing-md);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  max-height: 500px;
  overflow-y: auto;

  @media (min-width: ${breakpoints.tablet}px) {
    width: 400px;
  }
  @media (min-width: ${breakpoints.tablet}px) {
    width: 500px;
    max-height: 550px;
  }
`;

const QuestionInfoContainer = styled.div`
  width: 100%;
  gap: var(--spacing-sm);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const QuestionOptions = styled(QuestionInfoContainer)`
  flex-direction: row;
  flex-wrap: wrap;
`;

const AnswerOptions = styled(QuestionOptions)`
  flex-direction: column;
  ol {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-sm);
  }
  p {
    font-size: var(--font-size-md);
    color: var(--gray);
    text-align: center;
    text-transform: capitalize;
    font-weight: bold;
    font-family: var(--primary-font-family);
  }

  @media (min-width: ${breakpoints.tablet}px) {
    p {
      font-size: var(--font-size-xl);
    }
  }
`;

const MatchControlsContainer = styled(AnswerOptions)``;
const QuizWildcardsContainer = styled(AnswerOptions)``;

const AdminQuizControlsFooter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: var(--spacing-sm);
  justify-content: center;
  flex-wrap: wrap;
`;

/*Quiz Options Button Styles */
const StartTimerButtonStyle: ButtonStyleType = {
  background: "var(--white)",
  color: "var(--gray)",
  width: {
    sm: 60,
    md: 60,
    lg: 80,
  },
  height: {
    sm: 60,
    md: 60,
    lg: 80,
  },
};

const StopTimerButtonStyle: ButtonStyleType = {
  ...StartTimerButtonStyle,
  background: "var(--gray)",
  color: "var(--white)",
};

const NewAttemptButtonStyle: ButtonStyleType = {
  ...StartTimerButtonStyle,
  background: "var(--primary-color-base)",
  color: "var(--white)",
};

const RestartQuestionButtonStyle: ButtonStyleType = {
  ...StartTimerButtonStyle,
  background: "var(--orange)",
  color: "var(--white)",
};

const LeaveGameButtonStyle: ButtonStyleType = {
  ...StartTimerButtonStyle,
  background: "var(--red)",
  color: "var(--white)",
};

/*Answers options Button styles*/
const AnswerOptionButtonStyle: ButtonStyleType = {
  ...StartTimerButtonStyle,
  background: "var(--primary-color-base)",
  color: "var(--white)",
};

const CallButtonStyle: ButtonStyleType = {
  ...StartTimerButtonStyle,
  background: "var(--primary-color-base)",
  color: "var(--white)",
};

const DividedButtonStyle: ButtonStyleType = {
  ...StartTimerButtonStyle,
  background: "var(--white)",
  color: "var(--primary-color-base)",
};

/*Footer Button Styles */
const FinishGameButtonStyle: ButtonStyleType = {
  background: "var(--red)",
  color: "var(--white)",
  width: {
    sm: 300,
    md: 250,
    lg: 250,
  },
  height: {
    sm: 78,
    md: 84,
    lg: 84,
  },
};

const RestartGameButtonStyle: ButtonStyleType = {
  ...FinishGameButtonStyle,
  background: "var(--orange)",
};

const ContinueGameButtonStyle: ButtonStyleType = {
  ...FinishGameButtonStyle,
  width: {
    sm: 100,
    md: 100,
    lg: 150,
  },
  height: {
    sm: 60,
    md: 60,
    lg: 70,
  },
  background: "var(--primary-color-base)",
};

const StopGameButtonStyle: ButtonStyleType = {
  ...ContinueGameButtonStyle,
  background: "var(--red)",
};

export {
  AdminQuizControlsContainer,
  QuestionInfoContainer,
  QuestionOptions,
  AnswerOptions,
  MatchControlsContainer,
  QuizWildcardsContainer,
  AdminQuizControlsFooter,
  StartTimerButtonStyle,
  StopTimerButtonStyle,
  NewAttemptButtonStyle,
  LeaveGameButtonStyle,
  AnswerOptionButtonStyle,
  CallButtonStyle,
  DividedButtonStyle,
  RestartQuestionButtonStyle,
  FinishGameButtonStyle,
  RestartGameButtonStyle,
  ContinueGameButtonStyle,
  StopGameButtonStyle,
};
