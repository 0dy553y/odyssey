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
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    boxShadow: '0px 0px 0px 0px',
    borderRadius: '1em',
    textTransform: 'none',
  },
  rejectButton: {
    color: theme.palette.secondary.main,
    backgroundColor: 'transparent',
    borderRadius: '1em',
    textTransform: 'none',
    marginRight: '1em',
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
        <Grid item xs={12}>
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
        <Grid
          container
          direction="row"
          alignContent="flex-start"
          sx={{ marginTop: '0.5em' }}
        >
          <Button
            variant="outlined"
            className={classes.rejectButton}
            onClick={() => dispatch(rejectFriendRequest(friendRequest.id))}
          >
            Decline
          </Button>

          <Button
            variant="contained"
            className={classes.acceptButton}
            onClick={() => dispatch(acceptFriendRequest(friendRequest.id))}
          >
            Accept
          </Button>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default NotificationsListItem;
