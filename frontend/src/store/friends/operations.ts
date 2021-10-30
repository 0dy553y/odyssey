import { OperationResult } from '../../types/store';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../index';
import { AnyAction } from 'redux';
import api from '../../api';
import { FriendListData } from '../../types/friends';
import { removeFriend, saveFriendList } from './actions';

export function loadAllFriends(username?: string): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    const response = await api.friends.getFriendList(username);
    const friends: FriendListData[] = response.payload.data;
    dispatch(saveFriendList(friends));
  };
}

export function deleteFriend(friendId: number): OperationResult {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    await api.friends.deleteFriend(friendId);
    dispatch(removeFriend(friendId));
  };
}
