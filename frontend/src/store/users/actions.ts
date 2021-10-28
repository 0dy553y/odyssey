import { UserData } from '../../types/auth';
import { SAVE_USER, SaveUserAction } from './types';

export function saveUser(user: UserData): SaveUserAction {
  return {
    type: SAVE_USER,
    user,
  };
}
