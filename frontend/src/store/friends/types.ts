import { FriendListData } from '../../types/friends';

// Action names
export const SAVE_FRIEND_LIST = 'friends/SAVE_FRIEND_LIST';

// Action types
export interface SaveFriendListAction {
  type: typeof SAVE_FRIEND_LIST;
  friendList: FriendListData[];
}

export type FriendActions = SaveFriendListAction;

export interface FriendsState {
  friendList: FriendListData[];
}
