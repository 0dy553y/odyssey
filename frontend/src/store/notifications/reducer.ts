import {
  NotificationActions,
  NotificationsState,
  SAVE_FRIEND_REQUEST_LIST,
} from './types';
import produce from 'immer';

const initialState: NotificationsState = {
  friendRequestList: [],
};

const notificationsReducer = produce(
  (draft: NotificationsState, action: NotificationActions) => {
    switch (action.type) {
      case SAVE_FRIEND_REQUEST_LIST: {
        draft.friendRequestList = action.friendRequestList;
        break;
      }
    }
  },
  initialState
);

export default notificationsReducer;
