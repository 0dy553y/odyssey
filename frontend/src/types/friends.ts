import { DataUrl } from './auth';

export interface FriendsListData {
  id: number;
  username: string;
  displayName: string;
  avatar?: DataUrl;
}

export type FriendsData = FriendsListData;
