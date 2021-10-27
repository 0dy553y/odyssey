import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  useMediaQuery,
  useTheme,
  TextField,
} from '@mui/material';

import './ReactionChip.scss';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const theme = useTheme();
  const shouldFullScreen = useMediaQuery(theme.breakpoints.only('xs'));

  return (
    <Dialog
      fullScreen={shouldFullScreen}
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Create Post</DialogTitle>
      <DialogContent>
        <TextField
          multiline
          autoFocus
          rows={5}
          fullWidth
          variant="standard"
          label="Post Body"
          defaultValue="TODO"
        />
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose} variant="outlined">
          Close
        </Button>
        <Button autoFocus onClick={onSubmit} variant="contained">
          Post
        </Button>
      </DialogActions>
    </Dialog>
  );
};
