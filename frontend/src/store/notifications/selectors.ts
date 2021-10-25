import { RootState } from '../index';
import { NotificationsState } from './types';
import { FriendRequestListData } from '../../types/friendrequests';

function getLocalState(state: RootState): NotificationsState {
  return state.notifications;
}

export function getFriendRequestList(
  state: RootState
): FriendRequestListData[] {
  return getLocalState(state).friendRequestList;
}
