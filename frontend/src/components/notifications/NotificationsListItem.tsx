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
import { ReactionChip } from '../feed/ReactionChip';
import { ReactionPicker } from '../feed/ReactionPicker';

interface Props {
  friendRequest: FriendRequestListData;
}

const NotificationsListItem: React.FC<Props> = ({ friendRequest }: Props) => {
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
        <ListItemText
          primary={
            sender.displayName
              ? `${sender.displayName} (${displayUsername(sender.username)})`
              : displayUsername(sender.username)
          }
        />
        <Grid item xs={12}>
          sent you a friend request!
        </Grid>
        {/*<Grid item xs={12}>*/}
        {/*  <Tooltip*/}
        {/*    arrow*/}
        {/*    title={displayDateWithTimestamp(post.createdAt)}*/}
        {/*    leaveTouchDelay={1500}*/}
        {/*    enterTouchDelay={50}*/}
        {/*  >*/}
        {/*    <Typography*/}
        {/*      component="span"*/}
        {/*      variant="subtitle2"*/}
        {/*      className={classes.subtitle}*/}
        {/*    >*/}
        {/*      {getDateFromNowString(post.createdAt)}*/}
        {/*    </Typography>*/}
        {/*  </Tooltip>*/}
        {/*</Grid>*/}
      </Grid>
    </ListItem>
  );
};

export default NotificationsListItem;
