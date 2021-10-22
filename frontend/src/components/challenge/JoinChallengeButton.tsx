import React from 'react';
import { makeStyles } from '@mui/styles';
import { Button, Typography } from '@mui/material';

const useStyles = makeStyles(() => ({
  joinButton: {
    marginTop: '28px',
    borderRadius: '20px',
    height: '50px',
    maxWidth: '300px',
    left: '50%',
    transform: 'translateX(-50%) translateY(280px)',
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 1,
    textTransform: 'none',
  },
}));

const JoinChallengeButton: React.FC = () => {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      fullWidth
      disableElevation
      className={classes.joinButton}
    >
      <Typography variant="body1">Join Challenge!</Typography>
    </Button>
  );
};

export default JoinChallengeButton;
