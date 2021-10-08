import React, { useReducer } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ChallengeData } from '../../types/challenges';
import { useHistory } from 'react-router-dom';

interface ChallengeDetailsPageState {
  challenge: ChallengeData;
}

const ChallengeDetailsPage: React.FC = () => {
  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h1" variant="h5">
        Couch to 5k
      </Typography>
    </Box>
  );
};

export default ChallengeDetailsPage;
