import { Answer, Match, MatchResult, Quiz } from "@models/DataModels";
import {
  getCorrectAnswerStyle,
  getIncorrectAnswerStyle,
  giveNewAttempt,
} from "./functions";
import { AnswerOptionStyleProps } from "@models/StylePropsModels";

export const validateAnswerWithDividedHelp = (match: Match): Match => {
  let updatedMatch: Match = { ...match };

  if (updatedMatch.isDividedWildCard) {
    updatedMatch = {
      ...updatedMatch,
      selectedAnswers: updatedMatch.selectedAnswers + 1,
    };
  } else {
    updatedMatch = {
      ...updatedMatch,
      selectedAnswers: 0,
    };
  }
  return updatedMatch;
};

export const validateAnswer = async (
  match: Match,
  idAnswer: number,
  selectedAnswer: Answer,
  quiz: Quiz,
  resetDividedWildCard: () => Promise<void>,
  updateQuiz: (id: string, matchResult: MatchResult) => Promise<void>,
  stopMatch: (id: string) => Promise<void>
): Promise<Match> => {
  let updatedMatch: Match = { ...match };
  if (selectedAnswer.isCorrectAnswer) {
    await updateQuiz(quiz.id, "Correcta");
    updatedMatch = {
      ...updatedMatch,
      correctAnswers: updatedMatch.correctAnswers + 1,
    };
    if (
      updatedMatch.selectedAnswers >= 1 ||
      updatedMatch.selectedAnswers === 0
    ) {
      await resetDividedWildCard();
    }
    if (!quiz.isNewAttempt) {
      updatedMatch = {
        ...updatedMatch,
        incorrectAnswers: 0,
        accumulatedEarn:
          updatedMatch.accumulatedEarn + updatedMatch.currentQuestion.reward,
      };
    }
    const newStyles = getCorrectAnswerStyle(idAnswer, updatedMatch.answerStyle);

    updatedMatch = {
      ...updatedMatch,
      answerStyle: newStyles,
    };
    await stopMatch(quiz.id);
  } else {
    if (!updatedMatch.isDividedWildCard) {
      updatedMatch = {
        ...updatedMatch,
        accumulatedEarn:
          quiz.consolationAward === ""
            ? updatedMatch.accumulatedEarn
            : window.parseInt(quiz.consolationAward),
      };
    }
    if (
      updatedMatch.selectedAnswers > 1 ||
      updatedMatch.selectedAnswers === 0
    ) {
      console.log(updatedMatch.selectedAnswers);
      await updateQuiz(quiz.id, "Incorrecta");
      await resetDividedWildCard();
      await stopMatch(quiz.id);
    } else {
      await updateQuiz(quiz.id, "EnEspera");
    }

    const newStyles = getIncorrectAnswerStyle(
      idAnswer,
      updatedMatch.answerStyle
    );
    updatedMatch = {
      ...updatedMatch,
      incorrectAnswers: updatedMatch.incorrectAnswers + 1,
      answerStyle: newStyles,
    };
  }
  return updatedMatch;
};

export const validateIsnewAttempt = async (
  match: Match,
  quiz: Quiz,
  initialAnswerStyle: AnswerOptionStyleProps[],
  updateQuiz: (id: string, matchResult: MatchResult) => Promise<void>
): Promise<Match> => {
  let updatedMatch: Match = { ...match };
  if (quiz.isNewAttempt) {
    await updateQuiz(quiz.id, "EnEspera");
    updatedMatch = {
      ...updatedMatch,
      answerStyle: initialAnswerStyle,
      currentQuestion: giveNewAttempt(
        quiz.questions,
        updatedMatch?.randomQuestions
      ),
    };
  } else {
    updatedMatch = {
      ...updatedMatch,
      currentQuestion:
        updatedMatch.randomQuestions[updatedMatch.currentQuestionIndex],
    };
  }

  return updatedMatch;
};
