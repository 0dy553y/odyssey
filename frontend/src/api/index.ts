import ChallengesAPI from './challenges';

const api = Object.freeze({
  challenges: new ChallengesAPI(),
});

export default api;
