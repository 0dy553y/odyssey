import { DataUrl } from './auth';
import { Character } from './map';

export interface FriendRequestListData {
  id: number;
  sentAt: Date;
  sender: {
    id: number;
    username: string;
    displayName: string;
    character: Character;
    avatar: DataUrl;
  };
}
