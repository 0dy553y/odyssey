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
import challengesReducer from './challenges/reducer';
import { ChallengesState } from './challenges/types';

export interface RootState {
  auth: AuthState;
  challenges: ChallengesState;
}

export const rootReducer = combineReducers({
  auth: authReducer,
  challenges: challengesReducer,
});

const storeEnhancer = applyMiddleware(thunk);

export default function configureStore(): Store {
  const isDevelopment = process.env.NODE_ENV === 'development';
  return createStore(
    rootReducer,
    isDevelopment ? composeWithDevTools(storeEnhancer) : storeEnhancer
  );
}
