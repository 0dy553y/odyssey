import { ApiPromise, EmptyPayload } from '../types/api';
import { FriendRequestListData } from '../types/friendrequests';
import BaseAPI from './base';

type PseudoFriendRequestListData = Omit<FriendRequestListData, 'sentAt'> & {
  sentAt: string;
};

const friendRequestListDataMapper = (
  request: PseudoFriendRequestListData
): FriendRequestListData => {
  return {
    ...request,
    sentAt: new Date(request.sentAt),
  };
};

class FriendRequestsAPI extends BaseAPI {
  protected static getFriendRequestsUrl(): string {
    return 'friend_requests';
  }

  public getFriendRequestsList(): ApiPromise<FriendRequestListData[]> {
    return this.get(FriendRequestsAPI.getFriendRequestsUrl()).then((resp) => {
      const data = (resp.payload.data as PseudoFriendRequestListData[]).map(
        friendRequestListDataMapper
      );
      return {
        ...resp,
        payload: {
          data,
        },
      };
    });
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
