import { FriendRequestListData } from '../../types/friendrequests';

// Action names
export const SAVE_FRIEND_REQUEST_LIST =
  'notifications/SAVE_FRIEND_REQUEST_LIST';
export const REMOVE_FRIEND_REQUEST = 'notifications/REMOVE_FRIEND_REQUEST';

// Action types
export interface SaveFriendRequestListAction {
  type: typeof SAVE_FRIEND_REQUEST_LIST;
  friendRequestList: FriendRequestListData[];
}

export interface RemoveFriendRequestAction {
  type: typeof REMOVE_FRIEND_REQUEST;
  friendRequestId: number;
}

export type NotificationActions =
  | SaveFriendRequestListAction
  | RemoveFriendRequestAction;

export interface NotificationsState {
  friendRequestList: FriendRequestListData[];
}
