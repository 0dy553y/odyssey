import { RootState } from '../index';
import { UsersState } from './types';
import { UserData } from '../../types/auth';

function getLocalState(state: RootState): UsersState {
  return state.users;
}

export function getUserByUsername(
  state: RootState,
  username: string
): UserData | undefined {
  return getLocalState(state).users[username];
}
