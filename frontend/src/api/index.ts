import AuthAPI from './auth';
import ChallengesAPI from './challenges';

const api = Object.freeze({
  challenges: new ChallengesAPI(),
  auth: new AuthAPI(),
});

export default api;
