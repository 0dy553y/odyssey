import BaseAPI from './base';
import { ApiPromise, EmptyPayload } from '../types/api';
import { FriendListData } from '../types/friends';

class FriendsAPI extends BaseAPI {
  protected static getFriendsUrl(): string {
    return 'friends';
  }

  public getFriendList(): ApiPromise<FriendListData[]> {
    return this.get(FriendsAPI.getFriendsUrl());
  }

  public deleteFriend(userId: number): ApiPromise<EmptyPayload> {
    return this.delete(`${FriendsAPI.getFriendsUrl()}/${userId}`);
  }
}

export default FriendsAPI;
