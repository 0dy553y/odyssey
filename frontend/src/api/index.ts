import AuthAPI from './auth';
import CategoriesAPI from './categories';
import ChallengesAPI from './challenges';
import TasksAPI from './tasks';
import UserChallengesAPI from './userchallenge';
import UserTasksAPI from './usertasks';
import FriendsAPI from './friends';
import FriendRequestsAPI from './friendrequests';

const api = Object.freeze({
  auth: new AuthAPI(),
  categories: new CategoriesAPI(),
  challenges: new ChallengesAPI(),
  friends: new FriendsAPI(),
  friendRequests: new FriendRequestsAPI(),
  tasks: new TasksAPI(),
  userTasks: new UserTasksAPI(),
  userChallenges: new UserChallengesAPI(),
});

export default api;
