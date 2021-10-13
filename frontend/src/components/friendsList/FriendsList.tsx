import React from 'react';
import { Divider, List } from '@mui/material';
import { UserData } from 'types/auth';
import { FriendsListItem } from './FriendsListItem';

interface FriendsListProps {
  friends: UserData[];
}

const FriendsList: React.FC<FriendsListProps> = ({ friends }) => {
  return (
    <List>
      {friends.map((friend, idx) => {
        // Omit divider for last friend
        if (idx === friends.length - 1) {
          return <FriendsListItem friend={friend} />;
        }

        return (
          <>
            <FriendsListItem friend={friend} />
            <Divider variant="inset" component="li" />
          </>
        );
      })}
    </List>
  );
};

export default FriendsList;
