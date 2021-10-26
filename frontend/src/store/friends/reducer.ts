import { FriendActions, FriendsState, SAVE_FRIEND_LIST } from './types';
import produce from 'immer';

const initialState: FriendsState = {
  friendList: [],
};

const friendsReducer = produce((draft: FriendsState, action: FriendActions) => {
  switch (action.type) {
    case SAVE_FRIEND_LIST: {
      draft.friendList = action.friendList;
      break;
    }
  }
}, initialState);

export default friendsReducer;
