import {
  FriendActions,
  FriendsState,
  REMOVE_FRIEND,
  SAVE_FRIEND_LIST,
} from './types';
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
    case REMOVE_FRIEND: {
      draft.friendList = draft.friendList.filter(
        (friend) => friend.id !== action.friendId
      );
      break;
    }
  }
}, initialState);

export default friendsReducer;
