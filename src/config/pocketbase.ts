import PocketBase from "pocketbase";

const PRODUCTION_API_URL = import.meta.env.VITE_POCKETBASE_URL_PRODUCTION;

export const apiUrl = PRODUCTION_API_URL;
const client = new PocketBase(apiUrl);

export { client };
