import { DataUrl } from './auth';

export interface FriendListData {
  id: number;
  username: string;
  displayName: string;
  avatar?: DataUrl;
}

export type FriendData = FriendListData;
