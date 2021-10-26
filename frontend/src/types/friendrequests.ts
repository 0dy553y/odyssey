import { DataUrl } from './auth';

export interface FriendRequestListData {
  id: number;
  sentAt: Date;
  sender: {
    id: number;
    username: string;
    displayName: string;
    avatar: DataUrl;
  };
}
