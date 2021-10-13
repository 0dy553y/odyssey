import * as React from 'react';
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography,
} from '@mui/material';
import { UserData } from 'types/auth';
import UserAvatar from 'components/userAvatar';
import { displayUsername } from 'utils/formatting';

interface FriendsListItemProps {
  friend: UserData;
}

export const FriendsListItem: React.FC<FriendsListItemProps> = ({ friend }) => {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <UserAvatar
          src={friend.avatar}
          username={friend.username}
          displayName={friend.displayName}
        />
      </ListItemAvatar>
      <ListItemText
        primary={friend.displayName ?? displayUsername(friend.username)}
        secondary={friend.displayName && displayUsername(friend.username)}
      />
    </ListItem>
  );
};
