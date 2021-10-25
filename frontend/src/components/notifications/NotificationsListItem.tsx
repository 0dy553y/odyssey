import React from 'react';
import { FriendRequestListData } from '../../types/friendrequests';
import {
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import UserAvatar from '../common/userAvatar';
import {
  displayDateWithTimestamp,
  displayUsername,
} from '../../utils/formatting';
import { getDateFromNowString } from '../../utils/date';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  subtitle: {
    color: '#A5A5A5',
  },
}));

interface Props {
  friendRequest: FriendRequestListData;
}

const NotificationsListItem: React.FC<Props> = ({ friendRequest }: Props) => {
  const classes = useStyles();
  const sender = friendRequest.sender;

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <UserAvatar
          src={sender.avatar}
          username={sender.username}
          displayName={sender.displayName}
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
              {getDateFromNowString(friendRequest.sentAt)}
            </Typography>
          </Tooltip>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default NotificationsListItem;
