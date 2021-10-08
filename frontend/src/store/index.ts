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
