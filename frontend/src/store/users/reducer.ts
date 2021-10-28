import { SAVE_USER, UserActions, UsersState } from './types';
import produce from 'immer';

const initialState: UsersState = {
  users: {},
};

const usersReducer = produce((draft: UsersState, action: UserActions) => {
  switch (action.type) {
    case SAVE_USER: {
      draft.users[action.user.username] = action.user;
      break;
    }
  }
}, initialState);

export default usersReducer;
