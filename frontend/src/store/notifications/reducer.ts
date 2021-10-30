import produce from 'immer';
import {
  NotificationActions,
  NotificationsState,
  REMOVE_FRIEND_REQUEST,
  RESET_NOTIFICATIONS,
  SAVE_FRIEND_REQUEST_LIST,
} from './types';

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
      case REMOVE_FRIEND_REQUEST: {
        draft.friendRequestList = draft.friendRequestList.filter(
          (friendRequest) => friendRequest.id !== action.friendRequestId
        );
        break;
      }
      case RESET_NOTIFICATIONS: {
        draft.friendRequestList = [];
        break;
      }
    }
  },
  initialState
);

export default notificationsReducer;
