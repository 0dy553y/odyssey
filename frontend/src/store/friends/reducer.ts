import produce from 'immer';
import {
  FriendActions,
  FriendsState,
  REMOVE_FRIEND,
  RESET_FRIENDS,
  SAVE_FRIEND_LIST,
} from './types';

const initialState: FriendsState = {
  friendList: [],
};

const friendsReducer = produce((draft: FriendsState, action: FriendActions) => {
  switch (action.type) {
    case SAVE_FRIEND_LIST: {
      draft.friendList = action.friendList;
      break;
    }
    case REMOVE_FRIEND: {
      draft.friendList = draft.friendList.filter(
        (friend) => friend.id !== action.friendId
      );
      break;
    }
    case RESET_FRIENDS: {
      draft.friendList = [];
      break;
    }
  }
}, initialState);

export default friendsReducer;
