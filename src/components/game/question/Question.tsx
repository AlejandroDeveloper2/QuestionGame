import { FaRegQuestionCircle } from "react-icons/fa";

import { getAnswerMark } from "@utils/functions";
import useQuizMatchStore from "@zustand/quizMatchStore";

import { AnswerOption, BadgeBase } from "@components/index";

import { AnswerList, QuestionBox, QuestionContainer } from "./Question.style";

const Question = (): JSX.Element => {
  const { match } = useQuizMatchStore();
  const answerMarks = getAnswerMark();

  return (
    <QuestionContainer>
      <QuestionBox>
        <div id="question-badge">
          <BadgeBase
            Icon={FaRegQuestionCircle}
            style={{ backgroundcolor: "var(--gray)", color: "var(--white)" }}
            value=""
          />
        </div>
        <p>{match.currentQuestion ? match.currentQuestion.questionBody : ""}</p>
      </QuestionBox>
      <AnswerList>
        {match.currentQuestion?.answers?.map((answer, i) => (
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
