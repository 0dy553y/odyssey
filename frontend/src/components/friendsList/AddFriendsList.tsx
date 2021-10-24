import React from 'react';
import { Divider, List } from '@mui/material';
import { AddFriendListData } from '../../types/friends';
import AddFriendsListItem from './AddFriendsListItem';

interface Props {
  users: AddFriendListData[];
}

const AddFriendsList: React.FC<Props> = ({ users }: Props) => {
  return (
    <List>
      {users.map((user, idx) => {
        return (
          <React.Fragment key={user.id}>
            <AddFriendsListItem user={user} />

            {/* include divider for all except last user */}
            {idx !== users.length - 1 && (
              <Divider variant="inset" component="li" />
            )}
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default AddFriendsList;
