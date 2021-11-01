export type Env = {
  BASE_CLIENT_URL: string;
  BASE_SERVER_URL: string;
  GOOGLE_ANALYTICS_ID: string;
};

declare global {
  interface Window {
    env: Env;
  }
}
