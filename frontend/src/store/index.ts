import {
  applyMiddleware,
  combineReducers,
  createStore,
  Store,
} from '@reduxjs/toolkit';
import authReducer, { AuthState } from './authReducer';
import challengesReducer from './challenges/reducer';
import { ChallengesState } from './challenges/types';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import categoriesReducer from './categories/reducer';
import { CategoriesState } from './categories/types';
import { TasksState } from './tasks/types';
import tasksReducer from './tasks/reducer';

export interface RootState {
  auth: AuthState;
  categories: CategoriesState;
  challenges: ChallengesState;
  tasks: TasksState;
}

export const rootReducer = combineReducers({
  auth: authReducer,
  categories: categoriesReducer,
  challenges: challengesReducer,
  tasks: tasksReducer,
});

const storeEnhancer = applyMiddleware(thunk);

export default function configureStore(): Store {
  const isDevelopment = process.env.NODE_ENV === 'development';
  return createStore(
    rootReducer,
    isDevelopment ? composeWithDevTools(storeEnhancer) : storeEnhancer
  );
}
