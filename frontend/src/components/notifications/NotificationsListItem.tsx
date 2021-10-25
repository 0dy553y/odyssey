import React from 'react';
import { FriendRequestListData } from '../../types/friendrequests';
import { ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import UserAvatar from '../common/userAvatar';
import { displayUsername } from '../../utils/formatting';

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
      <ListItemText
        primary={sender.displayName ?? displayUsername(sender.username)}
        secondary={sender.displayName && displayUsername(sender.username)}
      />
    </ListItem>
  );
};

export default NotificationsListItem;
