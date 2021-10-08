import { UserData } from '../../types/auth';

// Action names
export const SET_USER = 'auth/SET_USER';

// Action types
export interface SetUserAction {
  type: typeof SET_USER;
  user: UserData;
}

export type AuthActions = SetUserAction;

export interface AuthState {
  user?: UserData;
}
