import React from 'react';
import { FriendRequestListData } from '../../types/friendrequests';
import {
  Button,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Theme,
  Tooltip,
  Typography,
} from '@mui/material';
import UserAvatar from '../common/userAvatar';
import {
  displayDateWithTimestamp,
  displayUsername,
} from '../../utils/formatting';
import { makeStyles } from '@mui/styles';
import { useDispatch } from 'react-redux';
import {
  acceptFriendRequest,
  rejectFriendRequest,
} from '../../store/notifications/operations';
import dayjs from 'dayjs';

const useStyles = makeStyles((theme: Theme) => ({
  subtitle: {
    color: '#A5A5A5',
  },
  acceptButton: {
    color: theme.palette.primary.main,
    backgroundColor: 'transparent',
  },
  rejectButton: {
    color: theme.palette.secondary.main,
    backgroundColor: 'transparent',
  },
}));

interface Props {
  friendRequest: FriendRequestListData;
}

const NotificationsListItem: React.FC<Props> = ({ friendRequest }: Props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const sender = friendRequest.sender;

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <UserAvatar
          src={sender.avatar}
          username={sender.username}
          displayName={sender.displayName}
          character={sender.character}
        />
      </ListItemAvatar>
      <Grid container alignItems="center">
        <Grid item xs={12}>
          <ListItemText
            primary={`${
              sender.displayName
                ? `${sender.displayName} (${displayUsername(sender.username)})`
                : displayUsername(sender.username)
            } sent you a friend request!`}
          />
        </Grid>
        <Grid item xs={4}>
          <Tooltip
            arrow
            title={displayDateWithTimestamp(friendRequest.sentAt)}
            leaveTouchDelay={1500}
            enterTouchDelay={50}
          >
            <Typography
              component="span"
              variant="subtitle2"
              className={classes.subtitle}
            >
              {dayjs(friendRequest.sentAt).fromNow()}
            </Typography>
          </Tooltip>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="text"
            className={classes.acceptButton}
            onClick={() => dispatch(acceptFriendRequest(friendRequest.id))}
          >
            Accept
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="text"
            className={classes.rejectButton}
            onClick={() => dispatch(rejectFriendRequest(friendRequest.id))}
          >
            Reject
          </Button>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default NotificationsListItem;
