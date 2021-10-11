import AuthAPI from './auth';
import CategoriesAPI from './categories';
import ChallengesAPI from './challenges';
import TasksAPI from './tasks';
import UserTasksAPI from './usertasks';

const api = Object.freeze({
  auth: new AuthAPI(),
  categories: new CategoriesAPI(),
  challenges: new ChallengesAPI(),
  tasks: new TasksAPI(),
  userTasks: new UserTasksAPI(),
});

export default api;
