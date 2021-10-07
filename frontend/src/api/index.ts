import CategoriesAPI from './categories';
import ChallengesAPI from './challenges';

const api = Object.freeze({
  challenges: new ChallengesAPI(),
  categories: new CategoriesAPI(),
});

export default api;
