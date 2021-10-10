export interface CreateNotificationData {
  message: string;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
}

export type NotificationKey = number;

export interface Notification extends CreateNotificationData {
  key: NotificationKey;
}

export interface NotificationsState {
  nextNotificationKey: number;
  notifications: Notification[];
}
