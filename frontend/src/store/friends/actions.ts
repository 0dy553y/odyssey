import { FriendListData } from '../../types/friends';
import {
  REMOVE_FRIEND,
  RemoveFriendAction,
  SAVE_FRIEND_LIST,
  SaveFriendListAction,
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
