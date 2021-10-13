import React from 'react';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import {
  AppBar,
  Box,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import { UserData } from 'types/auth';
import FriendsList from 'components/friendsList';

const mockFriends: UserData[] = [
  {
    id: 2,
    username: 'aaaaa',
    displayName: 'hello',
  },
  {
    id: 3,
    username: 'aaaaa',
    displayName: 'hello',
  },
  {
    id: 4,
    username: 'aaaaa',
    displayName: 'hello',
  },
  {
    id: 5,
    username: 'aaaaa',
    displayName: 'hello',
  },
];

const FriendsPage: React.FC = () => {
  const history = useHistory();
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" onClick={() => history.goBack()}>
            <ChevronLeft />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Typography component="h1" variant="h5">
        Your Friends
      </Typography>

      <FriendsList friends={mockFriends} />
    </Box>
  );
};

export default FriendsPage;
