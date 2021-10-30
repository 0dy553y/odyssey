import { FriendRequestListData } from '../../types/friendrequests';
import {
  RemoveFriendRequestAction,
  REMOVE_FRIEND_REQUEST,
  ResetNotificationsAction,
  RESET_NOTIFICATIONS,
  SaveFriendRequestListAction,
  SAVE_FRIEND_REQUEST_LIST,
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

export function resetNotifications(): ResetNotificationsAction {
  return {
    type: RESET_NOTIFICATIONS,
  };
}
