import React from 'react';
import { Button, Theme, Typography } from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import AddIcon from '@mui/icons-material/Add';

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    position: 'fixed',
    left: 0,
    top: '70%',
    transform: 'rotate(-90deg) translateX(-50%)',
    transformOrigin: 'top left',
    backgroundColor: 'black',
    color: 'lightgray',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
    },
  },
  buttonContent: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  buttonIcon: {
    marginBottom: 2,
  },
}));

// Hardcoded since this feedback component is temporary.
const feedbackLink = 'https://youtu.be/QJ7YeSoDYlY';

const FeedbackOverlay: React.FC = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <Button className={classes.button} href={feedbackLink} target="_blank">
      <div className={classes.buttonContent}>
        <AddIcon className={classes.buttonIcon} />
        <Typography style={{ textTransform: 'none' }}>
          Provide Feedback
        </Typography>
      </div>
    </Button>
  );
};

export default FeedbackOverlay;
