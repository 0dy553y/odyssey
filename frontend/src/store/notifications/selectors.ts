import { RootState } from '../index';
import { Notification, NotificationsState } from './types';

function getLocalState(state: RootState): NotificationsState {
  return state.notifications;
}

export function getNotifications(state: RootState): Notification[] {
  return getLocalState(state).notifications;
}
