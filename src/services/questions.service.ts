import { Quiz, ServerResponse } from "@models/DataModels";
import { client } from "@config/pocketbase";

const getQuiz = async (): Promise<Quiz> => {
  let response: Quiz[];

  try {
    response = await client
      .collection("quiz")
      .getFullList({ requestKey: null });
  } catch (_e: unknown) {
    const errorMessage = (_e as ServerResponse).message;
    throw new Error(errorMessage);
  }
  return response[0];
};

export { getQuiz };
