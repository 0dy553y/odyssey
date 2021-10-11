import React, { useState, useEffect } from 'react';
import { removeNotification } from 'store/notifications/actions';
import { useSnackbar } from 'notistack';
import { getNotifications } from 'store/notifications/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationKey } from 'store/notifications/types';

const Notifier: React.FC = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const notifications = useSelector(getNotifications);

  const [displayedNotificationKeys, setDisplayedNotificationKeys] = useState<
    NotificationKey[]
  >([]);

  useEffect(() => {
    notifications.map((notification) => {
      // If notification already displayed, abort
      if (displayedNotificationKeys.includes(notification.key)) {
        return;
      }

      // Display notification using Snackbar
      enqueueSnackbar(notification.message, {
        variant: notification.variant,
      });

      setDisplayedNotificationKeys([
        ...displayedNotificationKeys,
        notification.key,
      ]);

      // Dispatch action to remove the notification from the redux store
      dispatch(removeNotification(notification.key));
    });
  }, [notifications, displayedNotificationKeys]);

  return <></>;
};

export default Notifier;
