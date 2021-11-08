import React from 'react';
import { Button } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  button: {
    borderRadius: '30px',
    height: '40px',
    marginLeft: '20px',
    marginRight: '20px',
    background: 'white',
    color: 'black',
    padding: '10px',
  },
  flippedIcon: {
    transform: 'rotate(180deg)',
  },
}));

interface Props {
  direction: 'left' | 'right';
  onClick: () => void;
  isVisible: boolean;
}

const ReturnToTodayButton: React.FC<Props> = ({
  direction,
  onClick,
  isVisible,
}: Props) => {
  const classes = useStyles();

  return (
    <Button
      onClick={onClick}
      sx={{ visibility: isVisible ? 'visible' : 'hidden' }}
      className={classes.button}
    >
      {direction === 'left' && <KeyboardBackspaceIcon />}
      Return to today
      {direction === 'right' && (
        <KeyboardBackspaceIcon className={classes.flippedIcon} />
      )}
    </Button>
  );
};

export default ReturnToTodayButton;
