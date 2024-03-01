import PocketBase from "pocketbase";

const API_URL = import.meta.env.VITE_POCKETBASE_URL_PRODUCTION;

export const apiUrl = API_URL;
const client = new PocketBase(apiUrl);

export { client };
