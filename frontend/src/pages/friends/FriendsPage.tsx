import React, { useEffect } from 'react';
import { ReactComponent as BackArrow } from 'assets/icons/arrow-left.svg';
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
import { SEARCH_USERS_ROUTE } from '../../routing/routes';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../store/auth/selectors';
import { RootState } from '../../store';
import { getUserByUsername } from '../../store/users/selectors';
import { displayUsername } from '../../utils/formatting';
import { loadUser } from '../../store/users/operations';

const useStyles = makeStyles((theme: Theme) => ({
  fab: {
    position: 'absolute',
    right: theme.spacing(4),
    bottom: theme.spacing(4),
    backgroundColor: 'black',
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

const FriendsPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { username: username } = useParams<{ username: string | undefined }>();

  const isOwnFriendsPage = username === undefined;
  const user = isOwnFriendsPage
    ? useSelector(getUser)
    : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      useSelector((state: RootState) => getUserByUsername(state, username!));

  useEffect(() => {
    dispatch(loadUser(username));
  }, []);

  if (!user) {
    return <></>;
  }

  return (
    <Box sx={{ padding: '2em 1.5em 0 1.5em' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            style={{ marginLeft: '-1.5em' }}
            edge="start"
            onClick={() => history.goBack()}
          >
            <BackArrow filter="invert(1)" height="1.5em" width="1.5em" />
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
          onClick={() => history.push(SEARCH_USERS_ROUTE)}
        >
          <PersonAddAlt1Icon />
        </Fab>
      )}
    </Box>
  );
};

export default FriendsPage;
