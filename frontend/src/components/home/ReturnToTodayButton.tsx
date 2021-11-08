import React from 'react';
import { Button } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { makeStyles } from '@mui/styles';
import { useIsDesktop } from '../../utils/windowSize';

const useStyles = makeStyles(() => ({
  button: {
    borderRadius: '30px',
    height: '40px',
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
  const displayFullText = useIsDesktop();

  return (
    <Button
      onClick={onClick}
      sx={{ visibility: isVisible ? 'visible' : 'hidden' }}
      className={classes.button}
    >
      {direction === 'left' && <KeyboardBackspaceIcon />}
      {displayFullText ? 'Return to today' : ''}
      {direction === 'right' && (
        <KeyboardBackspaceIcon className={classes.flippedIcon} />
      )}
    </Button>
  );
};

export default ReturnToTodayButton;
