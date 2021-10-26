import { FriendRequestListData } from '../../types/friendrequests';
import {
  REMOVE_FRIEND_REQUEST,
  RemoveFriendRequestAction,
  SAVE_FRIEND_REQUEST_LIST,
  SaveFriendRequestListAction,
} from './types';

export function saveFriendRequestList(
  friendRequestList: FriendRequestListData[]
): SaveFriendRequestListAction {
  return {
    type: SAVE_FRIEND_REQUEST_LIST,
    friendRequestList,
  };
}

export function removeFriendRequest(
  friendRequestId: number
): RemoveFriendRequestAction {
  return {
    type: REMOVE_FRIEND_REQUEST,
    friendRequestId,
  };
}
