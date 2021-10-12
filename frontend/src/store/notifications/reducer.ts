import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  CreateNotificationData,
  NotificationKey,
  NotificationsState,
} from './types';

const initialState: NotificationsState = {
  nextNotificationKey: 0,
  notifications: [],
};

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (
      state,
      action: PayloadAction<CreateNotificationData>
    ): void => {
      state.notifications.push({
        ...action.payload,
        key: state.nextNotificationKey,
      });

      state.nextNotificationKey += 1;
    },
    removeNotification: (
      state,
      action: PayloadAction<NotificationKey>
    ): void => {
      state.notifications = state.notifications.filter(
        (notification) => notification.key !== action.payload
      );
    },
    resetNotifications: (state): void => {
      state.nextNotificationKey = 0;
      state.notifications = [];
    },
  },
});

export default notificationsSlice.reducer;
