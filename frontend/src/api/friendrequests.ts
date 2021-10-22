import BaseAPI from './base';
import { ApiPromise, EmptyPayload } from '../types/api';
import { FriendRequestListData } from '../types/friendrequests';

class FriendRequestsAPI extends BaseAPI {
  protected static getFriendRequestsUrl(): string {
    return 'friend_requests';
  }

  public getFriendRequestsList(): ApiPromise<FriendRequestListData[]> {
    return this.get(FriendRequestsAPI.getFriendRequestsUrl());
  }

  public sendFriendRequest(userId: number): ApiPromise<EmptyPayload> {
    return this.post(FriendRequestsAPI.getFriendRequestsUrl(), {
      receiverId: userId,
    });
  }

  public acceptFriendRequest(
    friendRequestId: number
  ): ApiPromise<EmptyPayload> {
    return this.patch(
      `${FriendRequestsAPI.getFriendRequestsUrl()}/${friendRequestId}`,
      null
    );
  }

  public rejectFriendRequest(
    friendRequestId: number
  ): ApiPromise<EmptyPayload> {
    return this.delete(
      `${FriendRequestsAPI.getFriendRequestsUrl()}/${friendRequestId}`
    );
  }
}

export default FriendRequestsAPI;
