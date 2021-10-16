import React from 'react';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';

const CompletedChallengesPage: React.FC = () => {
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
        Your completed challenges
      </Typography>
    </Box>
  );
};

export default CompletedChallengesPage;
