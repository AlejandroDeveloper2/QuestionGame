import { Match, ServerResponse } from "@models/DataModels";
import { client } from "@config/pocketbase";

const getMatch = async (): Promise<Match> => {
  let response: Match[];
  try {
    response = await client
      .collection("match")
      .getFullList({ requestKey: null });
  } catch (_e: unknown) {
    const errorMessage = (_e as ServerResponse).message;
    throw new Error(errorMessage);
  }
  return response[0];
};

export { getMatch };
