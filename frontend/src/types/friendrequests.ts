import { DataUrl } from './auth';

export interface FriendRequestListData {
  id: number;
  sender: {
    id: number;
    username: string;
    displayName: string;
    avatar: DataUrl;
  };
}
