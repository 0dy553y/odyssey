import React, { useEffect } from 'react';
import { Divider, List, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getFriendRequestList } from '../../store/notifications/selectors';
import { loadAllFriendRequests } from '../../store/notifications/operations';
import NotificationsListItem from './NotificationsListItem';

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

  const friendRequests = useSelector(getFriendRequestList);

  if (friendRequests.length == 0) {
    return (
      <div className={classes.textContainer}>
        <Typography align="center" className={classes.text}>
          You have no pending notifications!
        </Typography>
      </div>
    );
  }

  return (
    <List>
      {friendRequests.map((friendRequest, idx) => {
        return (
          <React.Fragment key={friendRequest.id}>
            <NotificationsListItem friendRequest={friendRequest} />

            {/* include divider for all except last notification */}
            {idx !== friendRequests.length - 1 && (
              <Divider variant="inset" component="li" />
            )}
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default NotificationsList;
