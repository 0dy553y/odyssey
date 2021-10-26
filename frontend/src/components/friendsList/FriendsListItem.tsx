import * as React from 'react';
import { ListItem, ListItemText, ListItemAvatar } from '@mui/material';
import UserAvatar from 'components/common/userAvatar';
import { displayUsername } from 'utils/formatting';
import { FriendListData } from '../../types/friends';

interface FriendsListItemProps {
  friend: FriendListData;
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
