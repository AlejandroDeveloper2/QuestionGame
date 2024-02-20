import { Answer, AnswerMark, Difficulty, Question } from "@models/DataModels";
import { AnswerOptionStyleProps } from "@models/StylePropsModels";

export const getInitialValues = <T>(
  formId: "category" | "question",
  data: T
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any => {
  const parsedData = Object(data);
  if (formId === "question")
    return {
      name: parsedData.name,
      questionBody: parsedData.questionBody,
      answers: parsedData.answers,
      difficulty: parsedData.difficulty,
      category: parsedData.category,
      time: parsedData.time,
      reward: parsedData.reward,
    };
  return {
    name: parsedData.name,
  };
};

export const getAnswerMark = (): AnswerMark[] => {
  return ["A", "B", "C", "D"];
};

export const getRandomQuestionsPerCategory = (
  questions: Question[],
  filter: Difficulty,
  questionsQuantity: number
): Question[] => {
  let question: Question, randomIndex: number;
  const shuffledQuestions: Question[] = questions.filter(
    (question) => question.difficulty === filter
  );
  /*Desordenamos el array */
  for (let i = shuffledQuestions.length - 1; i > 0; i--) {
    randomIndex = Math.floor(Math.random() * (i + 1));
    question = shuffledQuestions[i];
    shuffledQuestions[i] = shuffledQuestions[randomIndex];
    shuffledQuestions[randomIndex] = question;
  }
  const randomQuestions: Question[] = shuffledQuestions.slice(
    0,
    questionsQuantity
  );
  return randomQuestions;
};

export const formatSeconds = (secondsParam: number): string => {
  const hours = Math.floor(secondsParam / 0xe10);
  const minutes = Math.floor(secondsParam / 0x3c) % 0x3c;
  const seconds = Math.round(secondsParam % 0x3c);

  return `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }:${seconds < 10 ? "0" + seconds : seconds}`;
};

export const shuffleQuestionsAnswer = (
  randomQuestions: Question[]
): Question[] => {
  let answer: Answer, randomIndex: number;

  const newRandomQuestions = randomQuestions.map((question: Question) => {
    const shuffleAnswers: Answer[] = [...question.answers];

    for (let i = shuffleAnswers.length - 1; i > 0; i--) {
      randomIndex = Math.floor(Math.random() * (i + 1));
      answer = shuffleAnswers[i];
      shuffleAnswers[i] = shuffleAnswers[randomIndex];
      shuffleAnswers[randomIndex] = answer;
    }
    return { ...question, answers: shuffleAnswers };
  });

  return newRandomQuestions;
};

export const giveNewAttempt = (
  allQuestions: Question[],
  randomQuestions: Question[]
): Question => {
  const filteredQuestions = allQuestions.filter(
    (question) => question.difficulty === "Experto"
  );
  const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
  const randomExpertQuestion = filteredQuestions.filter(
    (_, i) => i == randomIndex
  )[0];

  if (randomQuestions.includes(randomExpertQuestion)) {
    return giveNewAttempt(allQuestions, randomQuestions);
  }
  return randomExpertQuestion;
};

export const getCorrectAnswer = (currentQuestionAnswers: Answer[]) => {
  const answerMarks: AnswerMark[] = ["A", "B", "C", "D"];
  const correctAnswer: Answer = currentQuestionAnswers?.filter(
    (answer) => answer.isCorrectAnswer
  )[0];
  const indexAnswerMark: number = currentQuestionAnswers?.findIndex(
    (answer) => answer.isCorrectAnswer
  );

  return { ...correctAnswer, answerMark: answerMarks[indexAnswerMark] };
};

export const getCorrectAnswerStyle = (
  idAnswer: number,
  answerStyle: AnswerOptionStyleProps[]
): AnswerOptionStyleProps[] => {
  return answerStyle.map((style, i) => {
    if (idAnswer === i)
      return {
        background: "var(--green)",
        color: "var(--white)",
        bordercolor: "var(--white)",
        opacity: 1,
      };
    return style;
  });
};

export const getIncorrectAnswerStyle = (
  idAnswer: number,
  answerStyle: AnswerOptionStyleProps[]
): AnswerOptionStyleProps[] => {
  return answerStyle.map((style, i) => {
    if (idAnswer === i)
      return {
        background: "var(--red)",
        color: "var(--white)",
        bordercolor: "var(--white)",
        opacity: 1,
      };
    return style;
  });
};
