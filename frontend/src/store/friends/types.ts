import { FriendListData } from '../../types/friends';

// Action names
export const SAVE_FRIEND_LIST = 'friends/SAVE_FRIEND_LIST';
export const REMOVE_FRIEND = 'friends/REMOVE_FRIEND';

// Action types
export interface SaveFriendListAction {
  type: typeof SAVE_FRIEND_LIST;
  friendList: FriendListData[];
}

export interface RemoveFriendAction {
  type: typeof REMOVE_FRIEND;
  friendId: number;
}

export type FriendActions = SaveFriendListAction | RemoveFriendAction;

export interface FriendsState {
  friendList: FriendListData[];
}
