import { FriendRequestListData } from '../../types/friendrequests';
import { SAVE_FRIEND_REQUEST_LIST, SaveFriendRequestListAction } from './types';

export function saveFriendRequestList(
  friendRequestList: FriendRequestListData[]
): SaveFriendRequestListAction {
  return {
    type: SAVE_FRIEND_REQUEST_LIST,
    friendRequestList,
  };
}
