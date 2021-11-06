import * as React from 'react';
import { ListItem, ListItemText, ListItemAvatar } from '@mui/material';
import UserAvatar from 'components/common/userAvatar';
import { displayUsername } from 'utils/formatting';
import { AddFriendListData } from '../../types/friends';
import { makeStyles } from '@mui/styles';
import { useHistory } from 'react-router-dom';
import { PROFILE_ROUTE } from '../../routing/routes';

const useStyles = makeStyles(() => ({
  listItem: {
    cursor: 'pointer',
  },
}));

interface Props {
  user: AddFriendListData;
}

const AddFriendsListItem: React.FC<Props> = ({ user }: Props) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <ListItem
      alignItems="flex-start"
      className={classes.listItem}
      onClick={() => {
        history.push(`${PROFILE_ROUTE}/${user.username}`);
      }}
    >
      <ListItemAvatar>
        <UserAvatar
          src={user.avatar}
          username={user.username}
          displayName={user.displayName}
          character={user.character}
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
