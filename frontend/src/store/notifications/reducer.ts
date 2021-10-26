import {
  NotificationActions,
  NotificationsState,
  REMOVE_FRIEND_REQUEST,
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
      case REMOVE_FRIEND_REQUEST: {
        draft.friendRequestList = draft.friendRequestList.filter(
          (friendRequest) => friendRequest.id !== action.friendRequestId
        );
        break;
      }
    }
  },
  initialState
);

export default notificationsReducer;
