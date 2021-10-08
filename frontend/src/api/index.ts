import CategoriesAPI from './categories';
import ChallengesAPI from './challenges';
import TasksAPI from './tasks';

const api = Object.freeze({
  categories: new CategoriesAPI(),
  challenges: new ChallengesAPI(),
  tasks: new TasksAPI(),
});

export default api;
