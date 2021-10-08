import { UserData } from '../../types/auth';
import { SetUserAction, SET_USER } from './types';

export function setUser(user: UserData): SetUserAction {
  return {
    type: SET_USER,
    user,
  };
}
