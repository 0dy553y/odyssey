import * as React from 'react';
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography,
} from '@mui/material';
import { UserData } from 'types/auth';
import UserAvatar from 'components/userAvatar';

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
        primary="Brunch this weekend?"
        secondary={
          <>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              Ali Connors
            </Typography>
            {" — I'll be in your neighborhood doing errands this…"}
          </>
        }
      />
    </ListItem>
  );
};
