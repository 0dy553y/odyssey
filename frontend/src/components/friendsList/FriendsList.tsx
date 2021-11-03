import React, { useEffect } from 'react';
import { Divider, List, Typography } from '@mui/material';
import { FriendsListItem } from './FriendsListItem';
import { FriendListData } from '../../types/friends';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllFriends } from '../../store/friends/operations';
import { getFriendList } from '../../store/friends/selectors';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  textContainer: {
    height: '100%',
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '2em',
  },
  text: {
    color: 'gray',
    marginLeft: 50,
    marginRight: 50,
  },
}));

const FriendsList: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { username } = useParams<{ username: string | undefined }>();

  useEffect(() => {
    dispatch(loadAllFriends(username));
  }, []);

  const friends: FriendListData[] = useSelector(getFriendList);

  return friends.length > 0 ? (
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
  ) : (
    <div className={classes.textContainer}>
      <Typography align="center" className={classes.text}>
        Why not add some friends? &#128111;
      </Typography>
    </div>
  );
};

export default FriendsList;
