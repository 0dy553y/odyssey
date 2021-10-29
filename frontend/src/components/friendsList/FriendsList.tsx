import React, { useEffect } from 'react';
import { Divider, List } from '@mui/material';
import { FriendsListItem } from './FriendsListItem';
import { FriendListData } from '../../types/friends';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllFriends } from '../../store/friends/operations';
import { getFriendList } from '../../store/friends/selectors';
import { useParams } from 'react-router-dom';

const FriendsList: React.FC = () => {
  const dispatch = useDispatch();
  const { username } = useParams<{ username: string | undefined }>();

  useEffect(() => {
    dispatch(loadAllFriends(username));
  }, []);

  const friends: FriendListData[] = useSelector(getFriendList);

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
