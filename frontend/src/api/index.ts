import AuthAPI from './auth';
import CategoriesAPI from './categories';
import ChallengesAPI from './challenges';
import FriendRequestsAPI from './friendrequests';
import FriendsAPI from './friends';
import LandingEmailsAPI from './landingemails';
import MapApi from './map';
import PostsAPI from './posts';
import TasksAPI from './tasks';
import UserChallengesAPI from './userchallenge';
import UserTasksAPI from './usertasks';

const api = Object.freeze({
  auth: new AuthAPI(),
  categories: new CategoriesAPI(),
  challenges: new ChallengesAPI(),
  friends: new FriendsAPI(),
  friendRequests: new FriendRequestsAPI(),
  posts: new PostsAPI(),
  tasks: new TasksAPI(),
  userTasks: new UserTasksAPI(),
  userChallenges: new UserChallengesAPI(),
  landingEmails: new LandingEmailsAPI(),
  map: new MapApi(),
});

export default api;
