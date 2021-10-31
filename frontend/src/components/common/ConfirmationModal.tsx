import React from 'react';
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

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  title,
  message,
  isOpen,
  onCancel,
  onConfirm,
}) => {
  return (
    <Dialog open={isOpen} onClose={onCancel} fullWidth maxWidth="sm">
      {title && <DialogTitle>{title}</DialogTitle>}

      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onCancel} variant="outlined">
          Cancel
        </Button>

        <Button autoFocus onClick={onConfirm} variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
