import PocketBase from "pocketbase";

//const LOCAL_API_URL = "http://127.0.0.1:8090";
const PRODUCTION_API_URL = "https://quiz-game.pockethost.io/";

export const apiUrl = PRODUCTION_API_URL;
const client = new PocketBase(apiUrl);

export { client };
