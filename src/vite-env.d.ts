/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_QUIZ_ID_PRODUCTION: string;
  readonly VITE_POCKETBASE_URL_PRODUCTION: string;
  readonly VITE_QUIZ_ID_LOCAL: string;
  readonly VITE_POCKETBASE_URL_LOCAL: string;
  // more env variables...
}
