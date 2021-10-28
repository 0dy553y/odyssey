import React from 'react';
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
  const history = useHistory();
  const { userId } = useParams<{ userId: string | undefined }>();

  const isOwnFriendsPage = userId === undefined;

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
        {isOwnFriendsPage ? 'Your friends' : `${userId}'s friends`}
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
