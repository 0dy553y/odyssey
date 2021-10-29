import { DataUrl } from './auth';

export interface FriendListData {
  id: number;
  username: string;
  displayName: string;
  avatar?: DataUrl;
}

export type FriendData = FriendListData;
export type AddFriendListData = FriendListData;

export enum FriendStatus {
  FRIENDS,
  FRIEND_REQUEST_SENT,
  FRIEND_REQUEST_RECEIVED,
  NOT_FRIENDS,
}
