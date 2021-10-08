import produce from 'immer';
import { AuthActions, AuthState, SET_USER } from './types';

const initialState: AuthState = {
  user: undefined,
};

const authReducer = produce((draft: AuthState, action: AuthActions) => {
  switch (action.type) {
    case SET_USER: {
      draft.user = action.user;
      break;
    }
  }
}, initialState);

export default authReducer;
