import React from 'react';
import { Divider, List } from '@mui/material';
import { FriendsListItem } from './FriendsListItem';
import { FriendListData } from '../../types/friends';

interface FriendsListProps {
  friends: FriendListData[];
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
