export type Env = {
  BASE_SERVER_URL: string;
};

declare global {
  interface Window {
    env: Env;
  }
}
