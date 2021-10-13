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
        return (
          <React.Fragment key={friend.id}>
            <FriendsListItem friend={friend} />

            {/* include divider for all except last friend */}
            {idx !== friends.length - 1 && (
              <Divider variant="inset" component="li" />
            )}
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default FriendsList;
