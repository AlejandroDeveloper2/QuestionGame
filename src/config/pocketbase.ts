import PocketBase from "pocketbase";

export const apiUrl = "https://quiz-game.pockethost.io/";
const client = new PocketBase(apiUrl);

export { client };
