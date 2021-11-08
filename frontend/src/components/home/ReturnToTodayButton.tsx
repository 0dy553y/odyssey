import React from 'react';
import { Button } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  button: {
    borderRadius: '30px',
    height: '40px',
  },
  flippedIcon: {
    transform: 'rotate(180deg)',
  },
}));

interface Props {
  direction: 'left' | 'right';
  onClick: () => void;
}

const ReturnToTodayButton: React.FC<Props> = ({
  direction,
  onClick,
}: Props) => {
  const classes = useStyles();

  return (
    <Button onClick={onClick} className={classes.button}>
      {direction === 'left' && <KeyboardBackspaceIcon />}
      Return to today
      {direction === 'right' && (
        <KeyboardBackspaceIcon className={classes.flippedIcon} />
      )}
    </Button>
  );
};

export default ReturnToTodayButton;
