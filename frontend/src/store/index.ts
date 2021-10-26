import {
  applyMiddleware,
  combineReducers,
  createStore,
  Store,
} from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import authReducer from './auth/reducer';
import { AuthState } from './auth/types';
import categoriesReducer from './categories/reducer';
import { CategoriesState } from './categories/types';
import challengesReducer from './challenges/reducer';
import { ChallengesState } from './challenges/types';
import postsReducer from './posts/reducer';
import { PostsState } from './posts/types';
import snackbarsReducer from './snackbars/reducer';
import { SnackbarsState } from './snackbars/types';
import tasksReducer from './tasks/reducer';
import { TasksState } from './tasks/types';
import userChallengesReducer from './userchallenges/reducer';
import { UserChallengesState } from './userchallenges/types';
import userTasksReducer from './usertasks/reducer';
import { UserTasksState } from './usertasks/types';
import { FriendsState } from './friends/types';
import friendsReducer from './friends/reducer';
import { NotificationsState } from './notifications/types';
import notificationsReducer from './notifications/reducer';

export interface RootState {
  auth: AuthState;
  categories: CategoriesState;
  challenges: ChallengesState;
  friends: FriendsState;
  notifications: NotificationsState;
  posts: PostsState;
  snackbars: SnackbarsState;
  tasks: TasksState;
  userTasks: UserTasksState;
  userChallenges: UserChallengesState;
}

export const rootReducer = combineReducers({
  auth: authReducer,
  categories: categoriesReducer,
  challenges: challengesReducer,
  friends: friendsReducer,
  notifications: notificationsReducer,
  posts: postsReducer,
  snackbars: snackbarsReducer,
  tasks: tasksReducer,
  userTasks: userTasksReducer,
  userChallenges: userChallengesReducer,
});

const storeEnhancer = applyMiddleware(thunk);

export default function configureStore(): Store {
  const isDevelopment = process.env.NODE_ENV === 'development';
  return createStore(
    rootReducer,
    isDevelopment ? composeWithDevTools(storeEnhancer) : storeEnhancer
  );
}
