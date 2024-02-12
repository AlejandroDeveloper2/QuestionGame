import { Answer, AnswerMark, Difficulty, Question } from "@models/DataModels";

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

export const giveNewAttempt = (randomQuestions: Question[]): Question => {
  const filteredQuestions = randomQuestions.filter(
    (question) => question.difficulty === "Experto"
  );
  const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
  const randomExpertQuestion = filteredQuestions.filter(
    (_, i) => i == randomIndex
  )[0];
  return randomExpertQuestion;
};
