import * as React from 'react';
import { ListItem, ListItemText, ListItemAvatar } from '@mui/material';
import UserAvatar from 'components/common/userAvatar';
import { displayUsername } from 'utils/formatting';
import { FriendListData } from '../../types/friends';
import { PROFILE_ROUTE } from '../../routing/routes';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  listItem: {
    cursor: 'pointer',
  },
}));

interface FriendsListItemProps {
  friend: FriendListData;
}

export const FriendsListItem: React.FC<FriendsListItemProps> = ({ friend }) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <ListItem alignItems="flex-start" className={classes.listItem}>
      <ListItemAvatar>
        <UserAvatar
          src={friend.avatar}
          username={friend.username}
          displayName={friend.displayName}
          character={friend.character}
        />
      </ListItemAvatar>
      <ListItemText
        onClick={() => {
          history.push(`${PROFILE_ROUTE}/${friend.username}`);
        }}
        primary={friend.displayName ?? displayUsername(friend.username)}
        secondary={friend.displayName && displayUsername(friend.username)}
      />
    </ListItem>
  );
};
