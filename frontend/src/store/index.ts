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
import snackbarsReducer from './snackbars/reducer';
import { SnackbarsState } from './snackbars/types';
import tasksReducer from './tasks/reducer';
import { TasksState } from './tasks/types';
import { UserTasksState } from './usertasks/types';
import userTasksReducer from './usertasks/reducer';

export interface RootState {
  auth: AuthState;
  categories: CategoriesState;
  challenges: ChallengesState;
  snackbars: SnackbarsState;
  tasks: TasksState;
  userTasks: UserTasksState;
}

export const rootReducer = combineReducers({
  auth: authReducer,
  categories: categoriesReducer,
  challenges: challengesReducer,
  snackbars: snackbarsReducer,
  tasks: tasksReducer,
  userTasks: userTasksReducer,
});

const storeEnhancer = applyMiddleware(thunk);

export default function configureStore(): Store {
  const isDevelopment = process.env.NODE_ENV === 'development';
  return createStore(
    rootReducer,
    isDevelopment ? composeWithDevTools(storeEnhancer) : storeEnhancer
  );
}
