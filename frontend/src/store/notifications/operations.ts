import { OperationResult } from '../../types/store';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../index';
import { AnyAction } from 'redux';
import api from '../../api';
import { FriendRequestListData } from '../../types/friendrequests';
import { removeFriendRequest, saveFriendRequestList } from './actions';

export function loadAllFriendRequests(): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.friendRequests.getFriendRequestsList();
    const friendRequests: FriendRequestListData[] = response.payload.data.map(
      (friendRequest) => {
        return {
          ...friendRequest,
          sentAt: new Date(friendRequest.sentAt),
        };
      }
    );
    dispatch(saveFriendRequestList(friendRequests));
  };
}

export function acceptFriendRequest(friendRequestId: number): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    await api.friendRequests.acceptFriendRequest(friendRequestId);
    dispatch(removeFriendRequest(friendRequestId));
  };
}

export function rejectFriendRequest(friendRequestId: number): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    await api.friendRequests.rejectFriendRequest(friendRequestId);
    dispatch(removeFriendRequest(friendRequestId));
  };
}
