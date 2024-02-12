import { FaRegQuestionCircle } from "react-icons/fa";

import { getAnswerMark } from "@utils/functions";
import useQuizMatchStore from "@zustand/quizMatchStore";

import { AnswerOption, BadgeBase, Logo } from "@components/index";

import { AnswerList, QuestionBox, QuestionContainer } from "./Question.style";

const Question = (): JSX.Element => {
  const { currentQuestion } = useQuizMatchStore();
  const answerMarks = getAnswerMark();

  return (
    <QuestionContainer>
      <figure>
        <Logo
          width={{ sm: 200, md: 220, lg: 270 }}
          height={{ sm: 200, md: 220, lg: 270 }}
        />
      </figure>
      <QuestionBox>
        <div id="question-badge">
          <BadgeBase
            Icon={FaRegQuestionCircle}
            style={{ backgroundColor: "var(--gray)", color: "var(--white)" }}
            value=""
          />
        </div>
        <p>{currentQuestion ? currentQuestion.questionBody : ""}</p>
      </QuestionBox>
      <AnswerList>
        {currentQuestion?.answers.map((answer, i) => (
          <AnswerOption
            key={i}
            idAnswer={i}
            answerMark={answerMarks[i]}
            answerData={answer}
          />
        ))}
      </AnswerList>
    </QuestionContainer>
  );
};

export default Question;
