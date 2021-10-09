import { UserData } from '../../types/auth';
import { RootState } from '../index';
import { AuthState } from './types';

function getLocalState(state: RootState): AuthState {
  return state.auth;
}

export function getUser(state: RootState): UserData | undefined {
  return getLocalState(state).user;
}

export function getIsValidatingToken(state: RootState): boolean {
  return getLocalState(state).isValidatingToken;
}
