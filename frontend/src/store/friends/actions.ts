import { FriendListData } from '../../types/friends';
import { SAVE_FRIEND_LIST, SaveFriendListAction } from './types';

export function saveFriendList(
  friendList: FriendListData[]
): SaveFriendListAction {
  return {
    type: SAVE_FRIEND_LIST,
    friendList,
  };
}
