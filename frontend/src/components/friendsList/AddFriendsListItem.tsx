import * as React from 'react';
import { ListItem, ListItemText, ListItemAvatar } from '@mui/material';
import UserAvatar from 'components/common/userAvatar';
import { displayUsername } from 'utils/formatting';
import { AddFriendListData } from '../../types/friends';

interface Props {
  user: AddFriendListData;
}

const AddFriendsListItem: React.FC<Props> = ({ user }: Props) => {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <UserAvatar
          src={user.avatar}
          username={user.username}
          displayName={user.displayName}
        />
      </ListItemAvatar>
      <ListItemText
        primary={user.displayName ?? displayUsername(user.username)}
        secondary={user.displayName && displayUsername(user.username)}
      />
    </ListItem>
  );
};

export default AddFriendsListItem;
