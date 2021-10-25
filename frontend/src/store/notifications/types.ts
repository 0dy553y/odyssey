import { FriendRequestListData } from '../../types/friendrequests';

// Action names
export const SAVE_FRIEND_REQUEST_LIST =
  'notifications/SAVE_FRIEND_REQUEST_LIST';

// Action types
export interface SaveFriendRequestListAction {
  type: typeof SAVE_FRIEND_REQUEST_LIST;
  friendRequestList: FriendRequestListData[];
}

export type NotificationActions = SaveFriendRequestListAction;

export interface NotificationsState {
  friendRequestList: FriendRequestListData[];
}
