import CategoriesAPI from './categories';
import ChallengesAPI from './challenges';
import TasksAPI from './tasks';

const api = Object.freeze({
  challenges: new ChallengesAPI(),
  categories: new CategoriesAPI(),
  tasks: new TasksAPI(),
});

export default api;
