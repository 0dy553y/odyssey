import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  useMediaQuery,
  useTheme,
  Theme,
  TextField,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { makeStyles } from '@mui/styles';

import './ReactionChip.scss';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreatePostFormState) => void;
}

interface CreatePostFormState {
  challengeId: number | string | null;
  body: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  createPostForm: {
    '&>:not(:last-child)': {
      marginBottom: '1em',
    },
  },
}));

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const shouldFullScreen = useMediaQuery(theme.breakpoints.only('xs'));
  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<CreatePostFormState>({
    defaultValues: {
      challengeId: '',
      body: '',
    },
  });

  return (
    <Dialog
      fullScreen={shouldFullScreen}
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit((data: CreatePostFormState) => {
          onSubmit(data);
          reset();
        })}
      >
        <DialogTitle>Create Post</DialogTitle>

        <DialogContent className={classes.createPostForm}>
          <Controller
            name="challengeId"
            control={control}
            rules={{ required: 'Please select a challenge' }}
            render={({ field }) => (
              <TextField
                {...field}
                required
                fullWidth
                autoFocus
                variant="standard"
                label="Challenge"
                error={!!errors.challengeId}
                helperText={errors.challengeId?.message}
                select
              >
                <MenuItem value={1}>Ten</MenuItem>
                <MenuItem value={2}>Twenty</MenuItem>
                <MenuItem value={3}>Thirty</MenuItem>
              </TextField>
            )}
          />

          <Controller
            name="body"
            control={control}
            rules={{ required: 'Post cannot be empty' }}
            render={({ field }) => (
              <TextField
                {...field}
                required
                fullWidth
                autoFocus
                variant="standard"
                label="Text"
                error={!!errors.body}
                helperText={errors.body?.message}
                multiline
                rows={5}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onClose} variant="outlined">
            Close
          </Button>

          <Button autoFocus variant="contained" type="submit">
            Post
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
