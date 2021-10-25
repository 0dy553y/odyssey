import { OperationResult } from '../../types/store';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../index';
import { AnyAction } from 'redux';
import api from '../../api';
import { FriendRequestListData } from '../../types/friendrequests';
import { saveFriendRequestList } from './actions';

export function loadAllFriendRequests(): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.friendRequests.getFriendRequestsList();
    const friendRequests: FriendRequestListData[] = response.payload.data;
    dispatch(saveFriendRequestList(friendRequests));
  };
}
