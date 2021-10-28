import React, { useEffect } from 'react';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import {
  AppBar,
  Box,
  Fab,
  IconButton,
  Theme,
  Toolbar,
  Typography,
} from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';
import FriendsList from 'components/friendsList';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { makeStyles } from '@mui/styles';
import { ADD_FRIENDS_ROUTE } from '../../routing/routes';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../store/auth/selectors';
import { RootState } from '../../store';
import { getUserById } from '../../store/users/selectors';
import { displayUsername } from '../../utils/formatting';
import { loadUser } from '../../store/users/operations';

const useStyles = makeStyles((theme: Theme) => ({
  fab: {
    position: 'absolute',
    right: theme.spacing(4),
    bottom: theme.spacing(4),
    backgroundColor: 'black',
    color: 'white',
  },
}));

const FriendsPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { userId } = useParams<{ userId: string | undefined }>();

  const isOwnFriendsPage = userId === undefined;
  const user = isOwnFriendsPage
    ? useSelector(getUser)
    : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      useSelector((state: RootState) => getUserById(state, userId!));

  useEffect(() => {
    dispatch(loadUser(userId));
  }, []);

  if (!user) {
    return <></>;
  }

  return (
    <Box sx={{ padding: '2em 1.5em 0 1.5em' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" onClick={() => history.goBack()}>
            <ChevronLeft />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Typography component="h1" variant="h4" style={{ fontFamily: 'Frock' }}>
        {isOwnFriendsPage
          ? 'Your friends'
          : `${user.displayName ?? displayUsername(user.username)}'s friends`}
      </Typography>

      <FriendsList />

      {isOwnFriendsPage && (
        <Fab
          className={classes.fab}
          onClick={() => history.push(ADD_FRIENDS_ROUTE)}
        >
          <PersonAddAlt1Icon />
        </Fab>
      )}
    </Box>
  );
};

export default FriendsPage;
