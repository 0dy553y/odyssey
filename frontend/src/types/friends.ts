import { DataUrl } from './auth';
import { Character } from './map';

export interface FriendListData {
  id: number;
  username: string;
  displayName: string;
  character: Character;
  avatar?: DataUrl;
}

export type FriendData = FriendListData;
export type AddFriendListData = FriendListData;

export enum FriendStatus {
  FRIENDS,
  FRIEND_REQUEST_SENT,
  FRIEND_REQUEST_RECEIVED,
  NOT_FRIENDS,
  SELF,
}

export interface FriendStatusData {
  friendStatus: FriendStatus;
  friendRequestId?: number;
}
