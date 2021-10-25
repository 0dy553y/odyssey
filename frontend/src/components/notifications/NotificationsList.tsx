import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getFriendRequestList } from '../../store/notifications/selectors';
import { loadAllFriendRequests } from '../../store/notifications/operations';

const useStyles = makeStyles(() => ({
  textContainer: {
    width: '100%',
    flexGrow: 1,
    display: 'grid',
    placeItems: 'center',
  },
  text: {
    color: 'gray',
    marginLeft: 50,
    marginRight: 50,
  },
}));

const NotificationsList: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadAllFriendRequests());
  }, []);

  const notifications = useSelector(getFriendRequestList);

  if (notifications.length == 0) {
    return (
      <div className={classes.textContainer}>
        <Typography align="center" className={classes.text}>
          You have no pending notifications!
        </Typography>
      </div>
    );
  }

  return <></>;
};

export default NotificationsList;
