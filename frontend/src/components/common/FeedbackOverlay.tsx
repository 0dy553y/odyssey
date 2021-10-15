import React from 'react';
import { Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  button: {
    position: 'fixed',
    left: 0,
    top: '50%',
    transform: 'rotate(-90deg) translateX(-50%)',
    transformOrigin: 'top left',
    backgroundColor: 'black',
  },
}));

const FeedbackOverlay: React.FC = () => {
  const classes = useStyles();

  return (
    <Button className={classes.button}>
      <Typography>Feedback</Typography>
    </Button>
  );
};

export default FeedbackOverlay;
