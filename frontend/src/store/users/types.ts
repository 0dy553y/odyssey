import { UserData } from '../../types/auth';

// Action names
export const SAVE_USER = 'users/SAVE_USER';

// Action types
export interface SaveUserAction {
  type: typeof SAVE_USER;
  user: UserData;
}

export type UserActions = SaveUserAction;

export interface UsersState {
  users: Record<string, UserData>;
}
