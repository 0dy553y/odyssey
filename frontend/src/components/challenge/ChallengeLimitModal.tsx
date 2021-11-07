import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  DialogActions,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/CloseRounded';
import { makeStyles } from '@mui/styles';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const useStyles = makeStyles(() => ({
  shareContainer: {
    marginTop: '20px',
    display: 'grid',
    gridAutoFlow: 'column',
    gridColumnGap: '10px',
  },
  modalHeader: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
}));

const ChallengeLimitModal: React.FC<Props> = ({ isOpen, onClose }: Props) => {
  const classes = useStyles();

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        style: { borderRadius: '1.5em', padding: '1em' },
      }}
    >
      <DialogActions
        sx={{
          marginBottom: '-3em',
          marginTop: '-0.5em',
        }}
      >
        <IconButton onClick={onClose}>
          <CloseIcon width="1.5em" />
        </IconButton>
      </DialogActions>
      <DialogTitle className={classes.modalHeader}>Oops! 😦</DialogTitle>
      <DialogContent>
        <Typography component="div" variant="body1">
          To help you achieve the best results, you can only join a maximum of 3
          challenges at any time. Hope we will see you back here soon!
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default ChallengeLimitModal;
