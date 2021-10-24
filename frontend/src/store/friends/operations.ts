import { OperationResult } from '../../types/store';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../index';
import { AnyAction } from 'redux';
import api from '../../api';
import { FriendListData } from '../../types/friends';
import { saveFriendList } from './actions';

export function loadAllFriends(): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.friends.getFriendList();
    const friends: FriendListData[] = response.payload.data;
    dispatch(saveFriendList(friends));
  };
}
