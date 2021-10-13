import React from 'react';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import { AppBar, Box, Grid, IconButton, Toolbar } from '@mui/material';
import { useHistory } from 'react-router-dom';

const FriendsPage: React.FC = () => {
  const history = useHistory();
  return (
    <Box>
      <Grid container>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" onClick={() => history.goBack()}>
              <ChevronLeft />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Grid>
    </Box>
  );
};

export default FriendsPage;
