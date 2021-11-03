import React from 'react';
import { makeStyles } from '@mui/styles';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

interface ConfirmationModalProps {
  title?: string;
  message: string;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
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
  actionButtons: {
    textTransform: 'none',
    borderRadius: '1em',
  },
}));

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  title,
  message,
  isOpen,
  onCancel,
  onConfirm,
}) => {
  const classes = useStyles();

  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        style: { borderRadius: '1.5em', padding: '1em' },
      }}
    >
      {title && (
        <DialogTitle className={classes.modalHeader}>{title}</DialogTitle>
      )}

      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button
          className={classes.actionButtons}
          autoFocus
          onClick={onCancel}
          variant="outlined"
        >
          Cancel
        </Button>

        <Button
          className={classes.actionButtons}
          autoFocus
          onClick={onConfirm}
          variant="contained"
          disableElevation
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
