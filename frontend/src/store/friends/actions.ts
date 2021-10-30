import { FriendListData } from '../../types/friends';
import {
  RemoveFriendAction,
  REMOVE_FRIEND,
  ResetFriendsAction,
  RESET_FRIENDS,
  SaveFriendListAction,
  SAVE_FRIEND_LIST,
} from './types';

export function saveFriendList(
  friendList: FriendListData[]
): SaveFriendListAction {
  return {
    type: SAVE_FRIEND_LIST,
    friendList,
  };
}

export function removeFriend(friendId: number): RemoveFriendAction {
  return {
    type: REMOVE_FRIEND,
    friendId,
  };
}

export function resetFriends(): ResetFriendsAction {
  return {
    type: RESET_FRIENDS,
  };
}
