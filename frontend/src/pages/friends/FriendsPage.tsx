import React from 'react';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import FriendsList from 'components/friendsList';

const FriendsPage: React.FC = () => {
  const history = useHistory();
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
        Your friends
      </Typography>

      <FriendsList />
    </Box>
  );
};

export default FriendsPage;
