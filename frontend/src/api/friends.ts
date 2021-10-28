import BaseAPI from './base';
import { ApiPromise, EmptyPayload } from '../types/api';
import { AddFriendListData, FriendListData } from '../types/friends';

class FriendsAPI extends BaseAPI {
  protected static getFriendsUrl(): string {
    return 'friends';
  }

  public getFriendList(userId?: number | string): ApiPromise<FriendListData[]> {
    return this.get(`${FriendsAPI.getFriendsUrl()}?userId=${userId ?? ''}`);
  }

  public searchUsersByUsername(
    username: string
  ): ApiPromise<AddFriendListData[]> {
    return this.get(`${FriendsAPI.getFriendsUrl()}/search?query=${username}`);
  }

  public deleteFriend(userId: number): ApiPromise<EmptyPayload> {
    return this.delete(`${FriendsAPI.getFriendsUrl()}/${userId}`);
  }
}

export default FriendsAPI;
