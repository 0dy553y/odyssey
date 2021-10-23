import { RootState } from '../index';
import { FriendsState } from './types';
import { FriendListData } from '../../types/friends';

function getLocalState(state: RootState): FriendsState {
  return state.friends;
}

export function getFriendList(state: RootState): FriendListData[] {
  return getLocalState(state).friendList;
}
