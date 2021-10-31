import { FriendRequestListData } from '../../types/friendrequests';

// Action names
export const SAVE_FRIEND_REQUEST_LIST =
  'notifications/SAVE_FRIEND_REQUEST_LIST';
export const REMOVE_FRIEND_REQUEST = 'notifications/REMOVE_FRIEND_REQUEST';
export const RESET_NOTIFICATIONS = 'notifications/RESET_NOTIFICATIONS';

// Action types
export interface SaveFriendRequestListAction {
  type: typeof SAVE_FRIEND_REQUEST_LIST;
  friendRequestList: FriendRequestListData[];
}

export interface RemoveFriendRequestAction {
  type: typeof REMOVE_FRIEND_REQUEST;
  friendRequestId: number;
}

export interface ResetNotificationsAction {
  type: typeof RESET_NOTIFICATIONS;
}

export type NotificationActions =
  | SaveFriendRequestListAction
  | RemoveFriendRequestAction
  | ResetNotificationsAction;

export interface NotificationsState {
  friendRequestList: FriendRequestListData[];
}
